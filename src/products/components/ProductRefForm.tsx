import * as yup from "yup";

import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { CurrencyType } from "../../common/enums";
import { useForm } from "react-hook-form";
import { CreateProductReferenceDto, UpdateProductReferenceDto } from "../dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Input from "../../common/components/Input";
import TextArea from "../../common/components/TextArea";
import Select from "../../common/components/Select";
import Button from "../../common/components/Button";
import InputTagStack from "../../common/components/InputTagStack";
import useProduct from "../hooks/useProduct";
import toast from "react-hot-toast";
import Text from "../../common/components/Text";

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
	const {
		currentReferences,
		getProductRefsFromServer,
		getParentRefs,
		getPosibleParents,
		createProductRef,
		updateProductRef,
		removeProductRef,
	} = useProduct({ childId: productId });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductReferenceDto>({
		defaultValues: { childId: productId },
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
		getProductRefsFromServer();
	}, []);

	return (
		<>
			<div>
				<Text>Referencias</Text>
				{currentReferences.map((ref) => (
					<div>{ref.parentId}</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] max-w-3xl">
				<Select {...register("parentId")} label="Padre" options={[]} />
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
