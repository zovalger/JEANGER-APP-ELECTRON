import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useStopwatch from "../hooks/useStopwatch";
import { IStopwatch } from "../interfaces";
import { CreateStopwatchDto, UpdateStopwatchDto } from "../dto";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import toast from "react-hot-toast";

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
	const { createStopwatch, updateStopwatch, removeStopwatch } = useStopwatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
		reset,
	} = useForm<CreateStopwatchDto | UpdateStopwatchDto>({
		defaultValues: {
			tempId: "",
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
		if (isSubmit) return;

		setIsSubmit(true);

		try {
			const t = !initialData
				? await createStopwatch(data as CreateStopwatchDto)
				: await updateStopwatch(data as UpdateStopwatchDto);

			if (successCallback) successCallback(t);

			reset();
		} catch (error) {
			toast.error(error.message || "Error al guardar el cronometro");
			if (errorCallback) errorCallback();
		}

		setIsSubmit(false);
		if (callback) callback();
	};

	const onDelete = async () => {
		if (!initialData) return;

		try {
			await removeStopwatch({
				_id: initialData._id || initialData.tempId,
				updatedAt: new Date().toString(),
			});

			successCallback(initialData);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register("name")}
				label="Nombre del Cronometro"
				name="name"
				autoComplete="none"
				autoFocus
			/>

			<div className="flex ">
				<Button
					className="flex-1"
					variant="danger"
					disabled={!initialData}
					type="button"
					onClick={onDelete}
				>
					Eliminar
				</Button>

				<Button className="flex-1" type="submit">
					Guardar
				</Button>
			</div>
		</form>
	);
}
