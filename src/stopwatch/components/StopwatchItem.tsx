import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";

import useStopwatch from "../hooks/useStopwatch";
import { UpdateStopwatchDto } from "../dto";
import { IStopwatch } from "../interfaces";

import Input from "../../common/components/Input";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useBill from "../../bills/hooks/useBill";
import useProduct from "../../products/hooks/useProduct";
import RouterLinks from "../../common/config/RouterLinks";

const schema = yup
	.object({
		_id: yup.string(),
		tempId: yup.string().uuid(),
		name: yup.string().min(2).required("Nombre es requerido"),
		updatedAt: yup.string(),
	})
	.required();

interface props {
	initialData: IStopwatch;
}
export default function StopwatchItem({ initialData }: props) {
	const { _id, tempId } = initialData;
	const currentId = _id || tempId;

	const initialValues = {
		_id: _id || "",
		tempId,
		name: initialData.name,
		updatedAt: new Date().toString(),
	};

	const navigate = useNavigate();

	const { productSettings, getProductSettings } = useProduct();
	const { setItem, currentBill } = useBill();
	const {
		getTime,
		start,
		pause,
		restart,
		switchClock,
		setTimeTo,
		referenceTime,
		updateStopwatch,
		removeStopwatch,
	} = useStopwatch();

	const [rename, setRename] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [deleteActive, setDeleteActive] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Pick<IStopwatch, "_id" | "tempId" | "name" | "updatedAt">>({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: UpdateStopwatchDto) => {
		if (data.name.trim() === initialData.name.trim()) return setRename(false);

		if (isSubmit) return;
		setIsSubmit(true);

		try {
			await updateStopwatch({
				...data,
				updatedAt: new Date().toString(),
			});

			setRename(false);
		} catch (error) {
			toast.error(error.message || "Error al actualizar el cronometro");
		}

		setIsSubmit(false);
	};

	useEffect(() => {
		reset(initialValues);
	}, [initialData, reset]);

	const addToBill = async () => {
		try {
			// todo: remover y colocar en una parte mas general
			if (!productSettings) await getProductSettings();

			if (!productSettings.stopwatchProduct) return;

			const productId = productSettings.stopwatchProduct;

			const { timeSeted } = initialData;

			pause(initialData.tempId);

			const time =
				(timeSeted ? timeSeted : getTime(initialData, referenceTime).time) /
				60000;

			await setItem(
				{
					billId: currentBill?.tempId,
					productId,
					quantity: time,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
				{ setQuantity: true }
			);

			navigate(RouterLinks.Bills);
		} catch (error) {
			toast.error(error.message || "Error al añadir");
		}
	};

	// ****************************************************************************
	// 										          render
	// ****************************************************************************

	return (
		<div
			className={`flex flex-col flex-1 min-w-52 w-60 overflow-hidden rounded-lg  ${
				initialData.timeSeted !== null ? "bg-[#ff07]" : "bg-[#0cf7]"
			} ${
				initialData.timeSeted !== null &&
				initialData.timeDate &&
				initialData.timeDate < referenceTime
					? " animate__animated animate__headShake animate__infinite"
					: ""
			}`}
			onContextMenu={() => setDeleteActive((prev) => !prev)}
		>
			<div className="flex items-center mb-2 ">
				{rename ? (
					<form className="flex flex-1" onSubmit={handleSubmit(onSubmit)}>
						<Input
							{...register("name")}
							placeholder="Nombre"
							autoFocus
							errorText={errors.name && errors.name.message}
							onBlur={() => {
								handleSubmit(onSubmit)();
							}}
						/>

						{/* <IconButton icon="Save" size="small" /> */}
					</form>
				) : (
					<Text
						className="pl-4 flex-1 cursor-text"
						onClick={() => setRename(true)}
					>
						{initialData.name}
					</Text>
				)}

				<IconButton onClick={addToBill} icon="ShoppingCart" size="small" />
				{deleteActive && (
					<IconButton
						onClick={() =>
							removeStopwatch({
								_id: currentId,
								updatedAt: new Date().toString(),
							})
						}
						icon="Trash"
						variant="danger"
						disabled={!!initialData.timeDate}
					/>
				)}

				<IconButton
					onClick={() => switchClock(currentId)}
					icon="SwitchHorizontal"
					disabled={!!initialData.timeDate}
				/>
			</div>

			<ClockTimeContainer
				data={initialData}
				time={getTime(initialData, referenceTime).format.time}
				onChangeMinuteInput={(minutes: string) => setTimeTo(currentId, minutes)}
				onStart={() => {
					start(currentId);
				}}
			/>

			<div className="flex">
				<Button
					className="flex-1"
					icon="Reply"
					disabled={!!initialData.timeDate}
					onClick={() => restart(currentId)}
				/>

				{initialData.timeDate ? (
					<Button
						className="flex-1"
						icon="Pause"
						onClick={() => pause(currentId)}
					/>
				) : (
					<Button
						className="flex-1"
						icon="Play"
						onClick={() => start(currentId)}
					/>
				)}
			</div>
		</div>
	);
}
