import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { CreateProductSettingDto, UpdateProductSettingDto } from "../dto";
import Select from "../../common/components/Select";
import Button from "../../common/components/Button";
import useProduct from "../hooks/useProduct";
import Text from "../../common/components/Text";
import { IProductSetting } from "../interfaces";

const schema = yup
	.object({
		stopwatchProduct: yup.string().required("El producto del cronometro"),
	})
	.required();

interface props {
	initialData?: IProductSetting;
	callback?: () => void;
	successCallback?: (data: IProductSetting) => void;
	errorCallback?: () => void;
}

function ProductSettingsForm({
	initialData,
	callback,
	successCallback,
	errorCallback,
}: props) {
	const { products, createProductSettings, updateProductSettings } =
		useProduct();

	const [openConfirm, setOpenConfirm] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateProductSettingDto>({
		defaultValues: {
			stopwatchProduct: null,
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async ({
		stopwatchProduct,
	}: CreateProductSettingDto | UpdateProductSettingDto) => {
		if (isSubmit) return;
		setIsSubmit(true);

		const toSend: CreateProductSettingDto | UpdateProductSettingDto = {};

		if (stopwatchProduct) toSend.stopwatchProduct = stopwatchProduct;

		try {
			const t = !initialData
				? await createProductSettings(toSend as CreateProductSettingDto)
				: await updateProductSettings(
						initialData._id,
						toSend as UpdateProductSettingDto
				  );

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
	}, [initialData, reset]);

	// const handdleDelete = async () => {
	// 	try {
	// 		await removeProduct(initialData?._id || "");
	// 		if (successCallback) successCallback(initialData);
	// 	} catch (error) {
	// 		toast.error(error.message || "Error al eliminar el producto");
	// 		if (errorCallback) errorCallback();
	// 	}
	// 	if (callback) callback();
	// };

	return (
		<>
			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<Text size="big" variant="bold">
						Configuraciones de Productos
					</Text>

					{/* <IconButton
						icon="Trash"
						variant="danger"
						type="button"
						onClick={() => setOpenConfirm(true)}
						disabled={!initialData}
						className="ml-4 mr-auto"
						size="small"
					/> */}

					<Button
						form={
							initialData
								? `product-settings-form-${initialData._id}`
								: "product-form"
						}
						icon="Save"
						variant="success"
						type="submit"
						size="small"
					>
						Guardar
					</Button>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					id={
						initialData
							? `product-settings-form-${initialData._id}`
							: "product-form"
					}
				>
					<Select
						className="w-full flex-none sm:flex-1/2"
						{...register("stopwatchProduct")}
						label="Precio del minuto de Cronometro"
						options={products.map((item) => ({
							label: `${item.name} ${item.cost} ${item.currencyType}`,
							value: item._id,
						}))}
						errorText={
							errors.stopwatchProduct && errors.stopwatchProduct.message
						}
					/>
				</form>
			</div>
		</>
	);
}

export default ProductSettingsForm;
