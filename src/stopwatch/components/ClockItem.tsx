import { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import { BillItem, Stopwatch } from "@/types";
import { useStopwatchContext } from "@/app/dashboard/stopwatch/context/Stopwatch.context";
import { milisecondsToTime } from "@/utils/milisecondsToTime";
import {
	getTimeStopwatch,
	pauseStopwatch,
	startStopwatch,
} from "../helpers/Stopwatch.helper";
import { getTimeTimer, pauseTimer, startTimer } from "../helpers/Timer.helper";
import ClockTimeContainer from "./ClockTimeContainer";
import { useGlobalContext } from "@/contexts/Global.context";
import { useProductContext } from "../../products/context/Product.context";
import { useBillContext } from "../../bill/context/Bill.context";
import { setOneBillItem } from "../../bill/helpers/Bill.helpers";
import { useRouter } from "next/navigation";

interface props {
	data: Stopwatch;
	onEdit(): void;
	editing: boolean;
}
export default function ClockItem({ data, onEdit, editing }: props) {
	const router = useRouter();

	const { productSettings, foreignExchange: dolar } = useGlobalContext();
	const { productsIndexed } = useProductContext();
	const { currentBill, setCurrentBill } = useBillContext();

	const { sendUpdateStopwatch, referenceTime } = useStopwatchContext();
	const [clock, setClock] = useState<Stopwatch>(data);

	useEffect(() => {
		if (!data) return;

		setClock(data);
	}, [data]);

	const onChangeMinuteInput = (minutes: string) => {
		const newTimeSeted = minutes ? parseInt(minutes) * 60000 : 0;
		setClock({ ...clock, timeSeted: newTimeSeted });
	};

	// ****************************************************************************
	// 										          funciones
	// ****************************************************************************

	const getTime = (): {
		format: { time: string; ms: string };
		time: number;
	} => {
		const { timeSeted } = clock;

		const time =
			timeSeted !== null
				? getTimeTimer(clock, referenceTime)
				: getTimeStopwatch(clock, referenceTime);

		const format = milisecondsToTime(time);

		return { format, time };
	};

	// ****************************************************************************
	// 										          triggers
	// ****************************************************************************

	const onStart = () => {
		const { timeSeted } = clock;

		const newTimer =
			timeSeted !== null ? startTimer(clock) : startStopwatch(clock);

		setClock(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const onPause = () => {
		const { timeSeted, timeDate } = clock;

		if (!timeDate) return;

		const newTimer =
			timeSeted !== null ? pauseTimer(clock) : pauseStopwatch(clock);

		setClock(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const switchClock = () => {
		const { timeSeted, timeDate } = clock;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newClock = {
			...clock,
			timeSeted: newSeted,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		setClock(newClock);
		sendUpdateStopwatch(newClock);
	};

	const onRestart = () => {
		const newTimer = {
			...clock,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		setClock(newTimer);

		sendUpdateStopwatch(newTimer);
	};

	const addToBill = () => {
		if (!productSettings) return;
		if (!productSettings.stopwatchProductId) return;

		const { timeSeted } = clock;

		onPause();

		const time = timeSeted ? timeSeted : getTime().time;

		// todo: obtener product

		const productId = productSettings.stopwatchProductId;

		const { currencyType, cost } = productsIndexed[productId];

		// todo: modificar bill
		const billItem: BillItem = {
			productId,
			quantity: Math.round(time / 60000),
			cost,
			currencyType,
		};

		const newBill = setOneBillItem(currentBill, billItem, dolar);

		// todo: actualizar en contexto
		setCurrentBill(newBill);

		router.replace("./bill");
	};

	// ****************************************************************************
	// 										          render
	// ****************************************************************************

	return (
		<Box
			sx={{
				borderRadius: "8px",
				boxShadow: "1px 1px 5px #0003",
				display: "inline-block",
				overflow: "hidden",
				width: "100%",
				bgcolor: clock.timeSeted !== null ? "#ff07" : "#0cf7",
			}}
			className={
				clock.timeSeted !== null &&
				clock.timeDate &&
				clock.timeDate < referenceTime
					? "animate__animated animate__headShake animate__infinite"
					: ""
			}
		>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Typography
					fontWeight={600}
					sx={{ m: ".5rem", ml: ".7rem", mr: "auto" }}
				>
					{clock.name}
				</Typography>

				{editing ? (
					<IconButton onClick={onEdit} color="inherit">
						<EditIcon />
					</IconButton>
				) : (
					<>
						<IconButton
							onClick={addToBill}
							color="inherit"
							aria-label="open drawer"
							// disabled={!!clock.timeDate}
						>
							<AddShoppingCartIcon />
						</IconButton>

						<IconButton
							onClick={switchClock}
							color="inherit"
							aria-label="open drawer"
							disabled={!!clock.timeDate}
						>
							{clock.timeSeted !== null ? (
								<AccessAlarmOutlinedIcon />
							) : (
								<TimerOutlinedIcon />
							)}
						</IconButton>
					</>
				)}
			</Box>

			<ClockTimeContainer
				data={clock}
				time={getTime().format.time}
				onChangeMinuteInput={onChangeMinuteInput}
				onStart={onStart}
			/>

			<Box sx={{ display: "flex" }}>
				<Button
					disabled={!!clock.timeDate}
					onClick={onRestart}
					sx={{ flexGrow: 1 }}
				>
					<ReplayOutlinedIcon />
				</Button>

				{!!clock.timeDate ? (
					<Button onClick={onPause} sx={{ flexGrow: 1 }}>
						<PauseOutlinedIcon />
					</Button>
				) : (
					<Button onClick={onStart} sx={{ flexGrow: 1 }}>
						<PlayArrowOutlinedIcon />
					</Button>
				)}
			</Box>
		</Box>
	);
}
