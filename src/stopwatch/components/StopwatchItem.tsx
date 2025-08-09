import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useStopwatch from "../hooks/useStopwatch";
import useProduct from "../../products/hooks/useProduct";
import useBill from "../../bills/hooks/useBill";
import RouterLinks from "../../common/config/RouterLinks";
import { IStopwatch } from "../interfaces";

import { useState } from "react";
import Input from "../../common/components/Input";
import { useForm } from "react-hook-form";
import { UpdateStopwatchDto } from "../dto";
import toast from "react-hot-toast";

interface props {
	data: IStopwatch;
}
export default function StopwatchItem({ data }: props) {
	const { _id, tempId } = data;
	const currentId = _id || tempId;

	const navigate = useNavigate();

	// const { productSettings, getProductSettings } = useProduct();
	// const { addOrUpdateProduct_To_CurrentBill } = useBill();
	const {
		getTime,
		start,
		pause,
		restart,
		switchClock,
		setTimeTo,
		referenceTime,
		updateStopwatch,
	} = useStopwatch();

	const [rename, setRename] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const {
		register,
		handleSubmit,

		formState: { errors },
		reset,
	} = useForm<UpdateStopwatchDto>({
		defaultValues: {
			_id,
			tempId,
			name: data.name,
			updatedAt: new Date().toString(),
		},
	});

	const onSubmit = async (data: UpdateStopwatchDto) => {
		if (isSubmit) return;
		setIsSubmit(true);

		try {
			const t = await updateStopwatch({
				...data,
				updatedAt: new Date().toString(),
			});

			setRename(false);
			reset();
		} catch (error) {
			toast.error(error.message || "Error al actualizar el cronometro");
		}

		setIsSubmit(false);
	};

	// const addToBill = async () => {
	// 	// todo: remover y colocar en una parte mas general
	// 	if (!productSettings) await getProductSettings();
	// 	if (!productSettings?.stopwatchProductId) return;

	// 	const productId = productSettings.stopwatchProductId;

	// 	const { timeSeted } = data;

	// 	pause(data);

	// 	const time =
	// 		(timeSeted ? timeSeted : getTime(data, referenceTime).time) / 60000;

	// 	await addOrUpdateProduct_To_CurrentBill(productId, time, {
	// 		setQuantity: true,
	// 	});

	// 	navigate(RouterLinks.Bills);
	// };

	// ****************************************************************************
	// 										          render
	// ****************************************************************************

	return (
		<div
			className={`flex flex-col flex-1 min-w-52 w-60 overflow-hidden rounded-lg  ${
				data.timeSeted !== null ? "bg-[#ff07]" : "bg-[#0cf7]"
			} ${
				data.timeSeted !== null &&
				data.timeDate &&
				data.timeDate < referenceTime
					? " animate__animated animate__headShake animate__infinite"
					: ""
			}`}
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
						{data.name}
					</Text>
				)}

				{/* <IconButton onClick={addToBill} icon="ShoppingCart"  size="small" /> */}

				<IconButton
					onClick={() => switchClock(currentId)}
					icon="SwitchHorizontal"
					disabled={!!data.timeDate}
					size="small"
				/>
			</div>

			<ClockTimeContainer
				data={data}
				time={getTime(data, referenceTime).format.time}
				onChangeMinuteInput={(minutes: string) => setTimeTo(currentId, minutes)}
				onStart={() => {
					start(currentId);
				}}
			/>

			<div className="flex">
				<Button
					className="flex-1"
					icon="Reply"
					disabled={!!data.timeDate}
					onClick={() => restart(currentId)}
				/>

				{data.timeDate ? (
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
