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
import IconButton from "../../common/components/IconButton";

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
		getPosibleParents,
		createProductRef,
		clearCurrentRef,
	} = useProduct({ childId: productId });

	const [posibleParents, setPosibleParents] = useState<PosibleParentDto[]>([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateProductReferenceDto>({
		defaultValues: { childId: productId, amount: 1, percentage: 1 },
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: CreateProductReferenceDto) => {
		try {
			await createProductRef(data);
			reset();
			setPosibleParents(await getPosibleParents(productId));

			if (successCallback) successCallback();
		} catch (error) {
			toast.error(error.message || "Error al guardar la referencia");
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
						<ProductRefItem
							key={ref._id}
							data={ref}
							callback={() =>
								getPosibleParents(productId).then((data) =>
									setPosibleParents(data)
								)
							}
						/>
					))}
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] max-w-3xl">
				<div className="flex gap-x-2 flex-wrap ">
					<Select
						className="w-full flex-none md:flex-1/2"
						{...register("parentId")}
						label="Padre"
						options={posibleParents.map((item) => ({
							label: `${item.name} ${item.cost} ${item.currencyType}`,
							value: item._id,
						}))}
						errorText={errors.parentId && errors.parentId.message}
					/>

					<Input
						className="flex-1 md:flex-1/6"
						{...register("amount")}
						label="Cantidad"
						type="number"
						errorText={errors.amount && errors.amount.message}
					/>

					<Input
						className="flex-1 md:flex-1/6"
						{...register("percentage")}
						label="Porcentaje"
						type="number"
						errorText={errors.percentage && errors.percentage.message}
					/>
					<IconButton variant="success" type="submit" icon="Plus" size="tiny" />
				</div>
			</form>
		</>
	);
}

export default ProductRefForm;
