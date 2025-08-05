import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { CurrencyType } from "../../common/enums";
import {
	CreateProductReferenceDto,
	PosibleParentDto,
	UpdateProductReferenceDto,
} from "../dto";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../common/components/Input";
import Select from "../../common/components/Select";
import Button from "../../common/components/Button";
import useProduct from "../hooks/useProduct";
import Text from "../../common/components/Text";
import ProductRefItem from "./ProductRefItem";
import { useEffect, useState } from "react";

const schema = yup
	.object({
		parentId: yup.string().required("El producto padre es requerido"),
		childId: yup.string().required("El producto hijo es requerido"),
		percentage: yup.number().positive().required("El porcentaje es requerido"),
		amount: yup.number().positive().required("La cantidad es requerido"),
	})
	.required();

interface props {
	productId?: string;
	callback?: () => void;
	successCallback?: () => void;
	errorCallback?: () => void;
}

function ProductRefForm({
	productId,
	callback,
	successCallback,
	errorCallback,
}: props) {
	const { currentReferences, getPosibleParents, createProductRef } = useProduct(
		{ childId: productId }
	);

	const [posibleParents, setPosibleParents] = useState<PosibleParentDto[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductReferenceDto>({
		defaultValues: { childId: productId, amount: 1, percentage: 1 },
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (
		data: CreateProductReferenceDto | UpdateProductReferenceDto
	) => {
		try {
			// const modifiedData = !keywordsEquals ? { keywords } : {};

			// for (const key in dirtyFields) {
			// 	if (dirtyFields[key]) modifiedData[key] = data[key];
			// }

			// if (!initialData) await createProduct(modifiedData as CreateProductDto);
			// else
			// 	await updateProduct(initialData._id, modifiedData as UpdateProductDto);

			if (successCallback) successCallback();
		} catch (error) {
			toast.error(error.message || "Error al guardar el producto");
			if (errorCallback) errorCallback();
		}

		if (callback) callback();
	};

	useEffect(() => {
		getPosibleParents(productId).then((data) => setPosibleParents(data));
	}, []);

	return (
		<>
			<Text size="big" variant="bold">
				Referencias
			</Text>
			<div>
				{currentReferences &&
					currentReferences.map((ref) => (
						<ProductRefItem key={ref._id} data={ref} />
					))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] max-w-3xl">
				<Select
					{...register("parentId")}
					label="Padre"
					options={posibleParents.map((item) => ({
						label: `${item.name} ${item.cost}`,
						value: item._id,
					}))}
				/>
				{errors.parentId && errors.parentId.message}

				<Input {...register("amount")} label="Cantidad" type="number" />
				{errors.amount && errors.amount.message}

				<Input {...register("percentage")} label="Porcentaje" type="number" />
				{errors.percentage && errors.percentage.message}

				<div className="flex justify-between items-center mt-4">
					<Button variant="success" type="submit">
						Guardar
					</Button>
				</div>
			</form>
		</>
	);
}

export default ProductRefForm;
