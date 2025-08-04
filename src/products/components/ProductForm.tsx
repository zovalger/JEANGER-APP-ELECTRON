import * as yup from "yup";

import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { CurrencyType } from "../../common/enums";
import { IProduct } from "../interfaces/product.interface";
import { useForm } from "react-hook-form";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Input from "../../common/components/Input";
import TextArea from "../../common/components/TextArea";
import Select from "../../common/components/Select";
import Button from "../../common/components/Button";
import InputTagStack from "../../common/components/InputTagStack";
import useProduct from "../hooks/useProduct";

const schema = yup
	.object({
		name: yup.string().min(3).required("Nombre es requerido"),
		cost: yup
			.number()
			.min(0, "El costo debe ser un número positivo")
			.required("Costo es requerido"),
		currencyType: yup.string().oneOf(Object.values(CurrencyType)),
		keywords: yup
			.array()
			.of(yup.string())
			.required("Las palabras clave son requeridas"),
		priority: yup
			.number()
			.min(0, "La prioridad debe ser un número positivo")
			.required("Prioridad es requerida"),
		favorite: yup.boolean().required("Favorito es requerido"),
		instructions: yup.string(),
	})
	.required();

interface props {
	initialData?: IProduct;
	callback?: () => void;
	successCallback?: () => void;
	errorCallback?: () => void;
}

function ProductForm({
	initialData,
	callback,
	successCallback,
	errorCallback,
}: props) {
	const { getCostInBSAndCurrency } = useForeignExchange();
	const { createProduct, updateProduct, removeProduct } = useProduct();

	const [keywords, setKeywords] = useState<string[]>(
		initialData?.keywords || []
	);

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<CreateProductDto>({
		defaultValues: { keywords: [] },
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: CreateProductDto | UpdateProductDto) => {
		try {
			const keywordsEquals =
				initialData?.keywords.sort().join(",").toLowerCase() ==
				keywords.sort().join(",").toLowerCase();

			const modifiedData = !keywordsEquals ? { keywords } : {};

			for (const key in dirtyFields) {
				if (dirtyFields[key]) modifiedData[key] = data[key];
			}

			console.log(modifiedData);

			if (!initialData) await createProduct(modifiedData as CreateProductDto);
			else
				await updateProduct(initialData._id, modifiedData as UpdateProductDto);

			if (successCallback) successCallback();
		} catch (error) {
			console.log(error);
			if (errorCallback) errorCallback();
		}

		if (callback) callback();
	};

	useEffect(() => {
		reset(initialData);
		setKeywords(initialData?.keywords || []);
	}, [initialData, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] max-w-3xl">
			<Input
				{...register("name")}
				label="Nombre del producto"
				// placeholder="nombre del producto"
			/>
			{errors.name && errors.name.message}

			<Input {...register("cost")} label="Costo" type="number" />
			{errors.cost && errors.cost.message}

			<Select
				{...register("currencyType")}
				label="Tipo de moneda"
				options={Object.values(CurrencyType).map((currency) => ({
					value: currency,
					label: currency,
				}))}
			/>
			{errors.currencyType && errors.currencyType.message}

			<InputTagStack
				label="Palabras para busqueda"
				data={keywords}
				setData={setKeywords}
			/>
			{errors.keywords && errors.keywords.message}

			<Input
				{...register("priority")}
				label="Orden de prioridad"
				type="number"
			/>
			{errors.priority && errors.priority.message}

			<Input {...register("favorite")} label="Favorito" type="checkbox" />
			{errors.favorite && errors.favorite.message}

			<TextArea {...register("instructions")} label="Instrucciones" />
			{errors.instructions && errors.instructions.message}

			<div className="flex justify-between items-center mt-4">
				<Button
					variant="danger"
					type="button"
					onClick={() => removeProduct(initialData?._id || "")}
					disabled={!initialData}
				>
					Eliminar
				</Button>

				<Button variant="success" type="submit">
					Guardar
				</Button>
			</div>
		</form>
	);
}

export default ProductForm;
