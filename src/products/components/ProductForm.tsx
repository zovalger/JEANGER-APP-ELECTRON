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
import toast from "react-hot-toast";
import ProductRefForm from "./ProductRefForm";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";

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
		defaultValues: {
			keywords: [],
			favorite: false,
			priority: 0,
			currencyType: CurrencyType.USD,
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: CreateProductDto | UpdateProductDto) => {
		try {
			const keywordsEquals =
				initialData?.keywords.sort().join(",").toLowerCase() ==
				keywords.sort().join(",").toLowerCase();

			let toSend: CreateProductDto | UpdateProductDto = { ...data, keywords };

			if (initialData) {
				const modifiedData = !keywordsEquals ? { keywords } : {};

				for (const key in dirtyFields) {
					if (dirtyFields[key]) modifiedData[key] = data[key];
				}

				toSend = modifiedData;
			}

			if (!initialData) await createProduct(toSend as CreateProductDto);
			else await updateProduct(initialData._id, toSend as UpdateProductDto);

			if (successCallback) successCallback();
		} catch (error) {
			toast.error(error.message || "Error al guardar el producto");
			if (errorCallback) errorCallback();
		}

		if (callback) callback();
	};

	useEffect(() => {
		reset(initialData);
		setKeywords(initialData?.keywords || []);
	}, [initialData, reset]);

	const handdleDelete = async () => {
		try {
			await removeProduct(initialData?._id || "");
			if (successCallback) successCallback();
		} catch (error) {
			toast.error(error.message || "Error al eliminar el producto");
			if (errorCallback) errorCallback();
		}
		if (callback) callback();
	};

	return (
		<>
			<div className="w-[80vw] max-w-3xl">
				<div className="flex justify-between items-center">
					<Text size="big" variant="bold">
						Producto
					</Text>

					<div className="flex ">
						<Button
							icon="Trash"
							variant="danger"
							type="button"
							onClick={handdleDelete}
							disabled={!initialData}
						>
							Eliminar
						</Button>

						<Button form="form" icon="Play" variant="success" type="submit">
							Guardar
						</Button>
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} id="form">
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
				</form>
			</div>

			{initialData && <ProductRefForm productId={initialData._id} />}
		</>
	);
}

export default ProductForm;
