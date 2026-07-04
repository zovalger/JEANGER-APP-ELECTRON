import { useState } from "react";
import { v4 as uuid } from "uuid";
import * as yup from "yup";

import Text from "./Text";
import Input from "./Input";
import IconButton from "./IconButton";
import Skeleton from "./Skeleton";
import useClipboard from "../hooks/useClipboard";
import useUtils from "../hooks/useUtils";
import Select from "./Select";
import { ICIVenezuelan } from "../interfaces/CIVenezuelan.interface";
import { useForm } from "react-hook-form";
import { VenezuelanQueryDto } from "../interfaces/venezuelan-query.dto";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object<VenezuelanQueryDto>({
		CI: yup.string().required("La cedula es requerida"),
		nationality: yup
			.string()
			.oneOf(["V", "E"])
			.required("La nacionalidad es requerido"),
	})
	.required();

export default function ConsultVenezuelan() {
	const { getVenezuelan } = useUtils();

	const [id] = useState(uuid());

	const [clientData, setClientData] = useState<ICIVenezuelan | null>(null);

	const [isSubmit, setIsSubmit] = useState(false);

	const {
		register,
		handleSubmit,
		resetDefaultValues,
		formState: { errors },
		reset,
	} = useForm<VenezuelanQueryDto>({
		defaultValues: {
			nationality: "V",
			CI: "",
		},
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: VenezuelanQueryDto) => {
		if (isSubmit) return;
		setClientData(null);
		setIsSubmit(true);

		try {
			const t = await getVenezuelan(data);

			setClientData(t);

			// if (successCallback) successCallback(t);
		} catch (error) {
			// toast.error(error.message || "Error al guardar el producto");
			// if (errorCallback) errorCallback();
		}

		setIsSubmit(false);
		// if (callback) callback();
	};

	const { isCopy, copyToClipboard } = useClipboard();

	// const startRequest = async () => {
	// 	try {
	// 		const result = await getVenezuelan(value);

	// 		setClientData(result);
	// 	} catch (error) {
	// 		console.log(error);

	// 		setError("Error al obtener saldo, reintentando.......");

	// 		await startRequest();
	// 	}
	// };

	// const handdleSubmit = async () => {
	// 	setError(null);

	// 	if (loading) return;
	// 	if (!value) return;

	// 	setLoading(true);

	// 	await startRequest();

	// 	setLoading(false);
	// 	setError(null);
	// };

	// const handdleClear = () => {
	// 	setValue("");
	// 	setClientData(null);
	// };

	return (
		<label htmlFor={id}>
			<form className="mt-4 p-4" onSubmit={handleSubmit(onSubmit)}>
				<Text variant="bold">Consultar Nombre</Text>

				<div className="flex items-center ">
					<Select
						{...register("nationality")}
						className="px-0 max-w-12 min-w-12 flex-1 "

						textSize="small"
						options={[
							{ label: "V", value: "V" },
							{ label: "E", value: "E" },
						]}
					/>

					<Input
						{...register("CI")}
						inputVariant="without-border"
						type="number"
						placeholder="Cedula de Identidad"
						autoComplete="none"
						onKeyDown={(event) => {
							event.stopPropagation();
							if (event.key === "Escape") reset();
							if (event.key === "Enter") handleSubmit(onSubmit);
						}}
					/>

					{/* 
					<IconButton
						icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
						size="small"
						onClick={() => copyToClipboard(value.trim())}
					/> */}

					<IconButton
						icon="Search"
						size="small"
						type="submit"
						// onClick={() => handleSubmit(onSubmit)}
					/>
				</div>

				{/* <Text>{errors?.CI?.message}</Text>
				<Text>{errors?.nationality?.message}</Text> */}
				{/* {error && <Text>{error}</Text>} */}

				<div className="mt-2">
					{isSubmit && (
						<div className="space-y-1">
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					)}

					{clientData && !isSubmit && (
						<>
							<Text selectable>
								{clientData.name} {clientData.lastname}
							</Text>
							<Text selectable>
								{clientData.gender == "M" ? "Masculino" : "Femenino"}
							</Text>
							<Text selectable>
								{new Date(clientData.birthdate).toLocaleDateString()}
							</Text>
						</>
					)}
				</div>
			</form>
		</label>
	);
}
