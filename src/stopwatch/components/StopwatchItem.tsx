import { Stopwatch } from "../interfaces/Stopwatch.interface";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useStopwatch from "../hooks/useStopwatch";

interface props {
	data: Stopwatch;
}
export default function StopwatchItem({ data }: props) {
	// const router = useNavigation();
	
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

	// const addToBill = () => {
	// 	if (!productSettings) return;
	// 	if (!productSettings.stopwatchProductId) return;

	// 	const { timeSeted } = data;

	// 	onPause();

	// 	const time = timeSeted ? timeSeted : getTime().time;

	// 	// todo: obtener product

	// 	const productId = productSettings.stopwatchProductId;

	// 	const { currencyType, cost } = productsIndexed[productId];

	// 	// todo: modificar bill
	// 	const billItem: BillItem = {
	// 		productId,
	// 		quantity: Math.round(time / 60000),
	// 		cost,
	// 		currencyType,
	// 	};

	// 	const newBill = setOneBillItem(currentBill, billItem, dolar);

	// 	// todo: actualizar en contexto
	// 	setCurrentBill(newBill);

	// 	router.replace("./bill");
	// };

	// ****************************************************************************
	// 										          render
	// ****************************************************************************

	return (
		<div
			className={`${
				data.timeSeted !== null &&
				data.timeDate &&
				data.timeDate < referenceTime
					? "animate__animated animate__headShake animate__infinite"
					: ""
			}`}
		>
			<div className="flex justify-between items-center pl-4">
				<Text>{data.name}</Text>

				<div>
					<IconButton
						onClick={addToBill}
						icon="ShoppingCart"
						disabled={!!data.timeDate}
					/>

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
