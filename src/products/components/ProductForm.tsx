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
import Accordion from "../../common/components/Accordion";
import Modal from "../../common/components/Modal";

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
	successCallback?: (data: IProduct) => void;
	errorCallback?: () => void;
}

function ProductForm({
	initialData,
	callback,
	successCallback,
	errorCallback,
}: props) {
	const { getCostInBSAndCurrency } = useForeignExchange();
	const { currentReferences, createProduct, updateProduct, removeProduct } =
		useProduct(initialData && { childId: initialData._id });

	const [keywords, setKeywords] = useState<string[]>(
		initialData?.keywords || []
	);

	const [openReferences, setOpenReferences] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<CreateProductDto>({
		defaultValues: {
			cost: 0,
			keywords: [],
			favorite: false,
			priority: 0,
			currencyType: CurrencyType.USD,
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: CreateProductDto | UpdateProductDto) => {
		if (isSubmit) return;
		setIsSubmit(true);

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

			const t = !initialData
				? await createProduct(toSend as CreateProductDto)
				: await updateProduct(initialData._id, toSend as UpdateProductDto);

			console.log(t);

			if (successCallback) successCallback(t);
		} catch (error) {
			toast.error(error.message || "Error al guardar el producto");
			if (errorCallback) errorCallback();
		}

		setIsSubmit(false);
		if (callback) callback();
	};

	useEffect(() => {
		reset(initialData);
		setKeywords(initialData?.keywords || []);
	}, [initialData, reset]);

	useEffect(() => {
		if (currentReferences.length) setOpenReferences(true);
	}, [currentReferences]);

	const handdleDelete = async () => {
		try {
			await removeProduct(initialData?._id || "");
			if (successCallback) successCallback(initialData);
		} catch (error) {
			toast.error(error.message || "Error al eliminar el producto");
			if (errorCallback) errorCallback();
		}
		if (callback) callback();
	};

	return (
		<>
			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<Text size="big" variant="bold">
						Producto
					</Text>

					<IconButton
						icon="Trash"
						variant="danger"
						type="button"
						onClick={() => setOpenConfirm(true)}
						disabled={!initialData}
						className="ml-4 mr-auto"
						size="small"
					/>

					<Button
						form={
							initialData ? `product-form-${initialData._id}` : "product-form"
						}
						icon="Play"
						variant="success"
						type="submit"
						size="small"
					>
						Guardar
					</Button>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					id={initialData ? `product-form-${initialData._id}` : "product-form"}
				>
					<div className="flex gap-x-2 flex-wrap">
						<Input
							className="flex-none md:flex-1/2"
							{...register("name")}
							label="Nombre del producto"
							errorText={errors.name && errors.name.message}
							autoFocus
						/>

						<Input
							className="flex-none sm:flex-1 md:flex-1/6"
							{...register("cost")}
							label="Costo"
							type="number"
							disabled={currentReferences?.length > 0}
							helperText={`	Costo en Bs: ${
								getCostInBSAndCurrency({
									cost: watch().cost || initialData?.cost || 0,
									currencyType:
										watch().currencyType ||
										initialData?.currencyType ||
										CurrencyType.USD,
								}).BSF
							}`}
							errorText={errors.cost && errors.cost.message}
						/>

						<Select
							className="min-w-[150px] flex-1 sm:flex-1 md:flex-1/6"
							{...register("currencyType")}
							label="Tipo de moneda"
							options={Object.values(CurrencyType)
								.map((currency) => ({
									value: currency,
									label: currency,
								}))
								.filter((item) =>
									currentReferences.length && item.label == CurrencyType.BSF
										? false
										: true
								)}
							errorText={errors.currencyType && errors.currencyType.message}
						/>
					</div>
				</form>
			</div>

			{initialData ? (
				<Accordion
					label="Configuraciones de referencias"
					setOpen={setOpenReferences}
					open={openReferences}
				>
					<ProductRefForm productId={initialData._id} />
				</Accordion>
			) : (
				<div className="mb-4">
					<Text>
						Para insertar las referencias primero debe nombrar el producto,
						elegir el tipo de moneda y guardarlo (el costo lo puede dejar por
						defecto)
					</Text>

					<Text>
						Al asignar referencias el producto solo puede tener asinado el monto
						en divisas y no en BS
					</Text>
				</div>
			)}

			<Accordion label="Configuraciones avanzadas">
				<InputTagStack
					label="Palabras para busqueda"
					data={keywords}
					setData={setKeywords}
					errorText={errors.keywords && errors.keywords.message}
				/>

				<Input
					{...register("favorite")}
					label="Favorito"
					type="checkbox"
					errorText={errors.favorite && errors.favorite.message}
				/>

				{watch().favorite && (
					<Input
						{...register("priority")}
						label="Orden de prioridad"
						type="number"
						errorText={errors.priority && errors.priority.message}
					/>
				)}

				<TextArea
					{...register("instructions")}
					label="Instrucciones"
					errorText={errors.instructions && errors.instructions.message}
				/>
			</Accordion>

			<Modal
				visible={openConfirm}
				onClose={() => {
					setOpenConfirm(false);
				}}
			>
				<Text className="mb-4" size="big" variant="bold">
					Seguro que quiere eliminar el producto?
				</Text>

				<div className="flex gap-2">
					<Button
						className="flex-1"
						icon="Trash"
						variant="danger"
						onClick={handdleDelete}
						type="button"
					>
						Eliminar
					</Button>

					<Button
						className="flex-1"
						onClick={() => setOpenConfirm(false)}
						type="button"
					>
						cancelar
					</Button>
				</div>
			</Modal>
		</>
	);
}

export default ProductForm;
