import { useNavigation } from "react-router-dom";
import { Stopwatch } from "../interfaces/Stopwatch.interface";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import ClockTimeContainer from "./ClockTimeContainer";
import useStopwatch from "../hooks/useStopwatch";

interface props {
	data: Stopwatch;
}
export default function ClockItem({ data }: props) {
	const router = useNavigation();
	const { getTime, start, pause, restart, switchClock } = useStopwatch();

	// const { productSettings, foreignExchange: dolar } = useGlobalContext();
	// const { productsIndexed } = useProductContext();
	// const { currentBill, setCurrentBill } = useBillContext();

	// const { sendUpdateStopwatch, referenceTime } = useStopwatchContext();
	// const [data, setClock] = useState<Stopwatch>(data);

	// useEffect(() => {
	// 	if (!data) return;

	// 	setClock(data);
	// }, [data]);

	const onChangeMinuteInput = (minutes: string) => {
		const newTimeSeted = minutes ? parseInt(minutes) * 60000 : 0;
		setClock({ ...data, timeSeted: newTimeSeted });
	};

	// ****************************************************************************
	// 										          funciones
	// ****************************************************************************

	// ****************************************************************************
	// 										          triggers
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
			className={
				data.timeSeted !== null &&
				data.timeDate &&
				data.timeDate < referenceTime
					? "animate__animated animate__headShake animate__infinite"
					: ""
			}
		>
			<div>
				<Text>{data.name}</Text>

				{editing ? (
					<IconButton onClick={onEdit} icon="Edit" />
				) : (
					<>
						<IconButton
							onClick={addToBill}
							icon="ShoppingCart"
							// disabled={!!data.timeDate}
						/>

						<IconButton
							onClick={switchClock}
							icon="SwitchHorizontal"
							disabled={!!data.timeDate}
						/>
					</>
				)}
			</div>

			<ClockTimeContainer
				data={data}
				time={getTime().format.time}
				onChangeMinuteInput={onChangeMinuteInput}
				onStart={onStart}
			/>

			<div>
				<Button icon="Reply" disabled={!!data.timeDate} onClick={onRestart} />

				{!!data.timeDate ? (
					<Button icon="Pause" onClick={onPause} />
				) : (
					<Button icon="Play" onClick={onStart} />
				)}
			</div>
		</div>
	);
}
