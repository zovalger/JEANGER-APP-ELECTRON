import { Stopwatch } from "../interfaces/Stopwatch.interface";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useStopwatch from "../hooks/useStopwatch";
import useProduct from "../../products/hooks/useProduct";
import useBill from "../../bills/hooks/useBill";

interface props {
	data: Stopwatch;
}
export default function StopwatchItem({ data }: props) {
	// const router = useNavigation();
	
	const {productSettings,getProductSettings} =useProduct()
	const {addProductToBill} =useBill()
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
		await getProductSettings()

		if (!productSettings) return;
		if (!productSettings.stopwatchProductId) return;

		const { timeSeted } = data;

		pause(data);

		const time = timeSeted ? timeSeted : getTime(data,referenceTime).time;

		// todo: obtener product

		const productId = productSettings.stopwatchProductId;

		const { currencyType, cost } = productsIndexed[productId];

	
		router.replace("./bill");
	};

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
