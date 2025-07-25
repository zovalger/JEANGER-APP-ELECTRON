import { Stopwatch } from "../interfaces/Stopwatch.interface";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useStopwatch from "../hooks/useStopwatch";
import useProduct from "../../products/hooks/useProduct";
import useBill from "../../bills/hooks/useBill";
import { useNavigate } from "react-router-dom";
import RouterLinks from "../../common/config/RouterLinks";

interface props {
	data: Stopwatch;
}
export default function StopwatchItem({ data }: props) {
	const navigate = useNavigate();

	const { productSettings, getProductSettings } = useProduct();
	const { addOrUpdateProduct_To_CurrentBill } = useBill();
	const {
		getTime,
		start,
		pause,
		restart,
		switchClock,
		setTimeTo,
		referenceTime,
	} = useStopwatch();

	// ****************************************************************************
	// 										          funciones
	// ****************************************************************************

	const addToBill = async () => {
		// todo: remover y colocar en una parte mas general
		if (!productSettings) await getProductSettings();
		if (!productSettings?.stopwatchProductId) return;

		const productId = productSettings.stopwatchProductId;

		const { timeSeted } = data;

		pause(data);

		const time =
			(timeSeted ? timeSeted : getTime(data, referenceTime).time) / 60000;

		await addOrUpdateProduct_To_CurrentBill(productId, time, {
			setQuantity: true,
		});

		navigate(RouterLinks.Bills);
	};

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
			<div className="flex justify-between items-center pl-4">
				<Text>{data.name}</Text>

				<div>
					<IconButton onClick={addToBill} icon="ShoppingCart" />

					<IconButton
						onClick={() => switchClock(data)}
						icon="SwitchHorizontal"
						disabled={!!data.timeDate}
					/>
				</div>
			</div>

			<ClockTimeContainer
				data={data}
				time={getTime(data, referenceTime).format.time}
				onChangeMinuteInput={(minutes: string) => setTimeTo(data, minutes)}
				onStart={() => {
					start(data);
				}}
			/>

			<div className="flex">
				<Button
					className="flex-1"
					icon="Reply"
					disabled={!!data.timeDate}
					onClick={() => restart(data)}
				/>

				{data.timeDate ? (
					<Button className="flex-1" icon="Pause" onClick={() => pause(data)} />
				) : (
					<Button className="flex-1" icon="Play" onClick={() => start(data)} />
				)}
			</div>
		</div>
	);
}
