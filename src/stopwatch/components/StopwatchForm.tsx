import * as yup from "yup";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useStopwatch from "../hooks/useStopwatch";
import { IStopwatch } from "../interfaces";
import { CreateStopwatchDto, UpdateStopwatchDto } from "../dto";
import Modal from "../../common/components/Modal";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";

const schema = yup
	.object({
		tempId: yup.string().default(""),
		name: yup.string().required().min(3, "Minimo 3 letras").default(""),
	})
	.required();

interface props {
	initialData?: IStopwatch;
	callback?: () => void;
	successCallback?: (data: IStopwatch) => void;
	errorCallback?: () => void;
}

export default function StopwatchForm({
	initialData,
	callback,
	successCallback,
	errorCallback,
}: props) {
	const { createStopwatch } = useStopwatch();

	// *******************************************************************
	// 													productos
	// *******************************************************************

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<CreateStopwatchDto | UpdateStopwatchDto>({
		defaultValues: {
			tempId: uuid(),
			name: "",
			timeDate: null,
			accumulatedTime: 0,
			timeSeted: 0,
		},
		// resolver: yupResolver(schema),
		mode: "onChange",
	});

	useEffect(() => {
		reset(initialData);
	}, [initialData, reset]);

	const [isSubmit, setIsSubmit] = useState(false);

	const onSubmit = async (data: CreateStopwatchDto | UpdateStopwatchDto) => {
		// if (isSubmit) return;
		// setIsSubmit(true);

		// try {
		// 	let toSend = data;

		// 	const t = !initialData
		// 		? await createProduct(toSend as CreateStopwatchDto)
		// 		: await updateProduct(initialData._id, toSend as UpdateStopwatchDto);

		// 	console.log(t);

		// 	if (successCallback) successCallback(t);
		// } catch (error) {
		// 	toast.error(error.message || "Error al guardar el producto");
		// 	if (errorCallback) errorCallback();
		// }

		// setIsSubmit(false);
		// if (callback) callback();
	};

	// const onDelete = async () => {
	// 	try {
	// 		if (!formik.values._id) return;

	// 		setOnSubmited(true);

	// 		sendDeleteStopwatch(formik.values._id);

	// 		handleClose();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}

	// 	setOnSubmited(false);
	// };

	return (
		<form>
			<Input label="Nombre del Cronometro" name="name" autoComplete="none" />
			<div>
				<Button color="error">Eliminar</Button>
				<Button>Guardar</Button>
			</div>
		</form>
	);
}
