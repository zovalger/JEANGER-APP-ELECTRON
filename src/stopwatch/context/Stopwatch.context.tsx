import { io, Socket } from "socket.io-client";
import { createContext, useContext, useState, useEffect } from "react";
import { Stopwatch } from "../interfaces/Stopwatch.interface";
import useStopwatch from "../hooks/useStopwatch";
import { StopwatchEvents } from "../enums/StopwatchEvents.enum";
import { SOCKET_SERVER_URL } from "../../common/config";

interface ContextProps {
	sendCreateStopwatch(data: Stopwatch): void;
	sendUpdateStopwatch(data: Stopwatch): void;
	sendDeleteStopwatch(_id: string): void;
	referenceTime: number;
}

const StopwatchContext = createContext<ContextProps>({
	sendCreateStopwatch: (data: Stopwatch): void =>
		console.log("sending stopwatch by socket", data),
	sendUpdateStopwatch: (data: Stopwatch): void =>
		console.log("sending stopwatch by socket", data),
	sendDeleteStopwatch: (id: string): void =>
		console.log("sending stopwatch by socket", id),
	referenceTime: Date.now(),
});

interface props {
	children?: React.ReactNode;
}

export const StopwatchContextProvider = ({ children }: props) => {
	// const { createNotification, closeNotification } = useSnackbarContext();

	const [socket, setSocket] = useState<Socket | null>(null);
	const [referenceTime, setReferenceTime] = useState(Date.now());

	const { getAllStopwatch, setStopwatch, removeStopwatch } = useStopwatch();

	// const [soundAlarmPlay, setSoundAlarmPlay] = useState(false);
	// const [lastTimer, setLastTimer] = useState("");

	useEffect(() => {
		setInterval(() => {
			const time = Date.now();

			setReferenceTime(time);
		}, 1000);
	}, []);

	useEffect(() => {
		getAllStopwatch().catch();
	}, []);

	const setListeners = async (socket: Socket) => {
		socket.on(StopwatchEvents.sendUpdate, setStopwatch);
		socket.on(StopwatchEvents.delete, removeStopwatch);
	};

	// useEffect(() => {
	// 	const pasados = stopwatches.filter(
	// 		(item) =>
	// 			item.timeSeted !== null &&
	// 			item.timeDate &&
	// 			item.timeDate < referenceTime
	// 	);

	// 	if (pasados.length) {
	// 		if (pasados[0]._id != lastTimer) {
	// 			setLastTimer(pasados[0]._id);
	// 			createNotification({
	// 				message: `Tiempo terminado: ${pasados[0].name}`,
	// 				autoHideDuration: null,
	// 				action: (
	// 					<>
	// 						<IconButton
	// 							size="small"
	// 							aria-label="close"
	// 							color="inherit"
	// 							onClick={() => {
	// 								const newStopwatch = startStopwatch(pasados[0]);
	// 								sendUpdateStopwatch(newStopwatch);
	// 								closeNotification();
	// 							}}
	// 						>
	// 							<PlayArrowIcon fontSize="small" sx={{ color: "#0cf7" }} />

	// 							{/* <CloseIcon /> */}
	// 						</IconButton>
	// 						<IconButton
	// 							size="small"
	// 							aria-label="close"
	// 							color="inherit"
	// 							onClick={() => {
	// 								const newTimer = pauseTimer(pasados[0]);
	// 								sendUpdateStopwatch(newTimer);
	// 								closeNotification();
	// 							}}
	// 						>
	// 							<CloseIcon fontSize="small" />
	// 						</IconButton>
	// 					</>
	// 				),
	// 			});
	// 		}

	// 		setSoundAlarmPlay(true);
	// 	} else {
	// 		setSoundAlarmPlay(false);
	// 		setLastTimer("");
	// 	}
	// }, [referenceTime]);

	useEffect(() => {
		if (socket) return;

		try {
			const soc = io(SOCKET_SERVER_URL);
			setSocket(soc);
			setListeners(soc);
		} catch (error) {
			console.log(error);
		}

		return () => {
			if (!socket) return;

			socket.disconnect();
		};
	}, [socket]);

	const sendCreateStopwatch = (data: Omit<Stopwatch, "_id">) => {
		if (!socket) return;
		socket.emit(StopwatchEvents.create, data);
	};

	const sendUpdateStopwatch = (data: Stopwatch) => {
		if (!socket) return;
		socket.emit(StopwatchEvents.sendUpdate, data);
	};

	const sendDeleteStopwatch = (_id: string) => {
		if (!socket) return;
		socket.emit(StopwatchEvents.delete, _id);
	};

	return (
		<StopwatchContext.Provider
			value={{
				sendCreateStopwatch,
				sendUpdateStopwatch,
				sendDeleteStopwatch,

				referenceTime,
			}}
		>
			{/* {isClient && (
				<ReactHowler
					src="/sounds/ringtone-126505.mp3"
					playing={soundAlarmPlay}
					volume={0.4}
					html5={true}
				/>
			)} */}

			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
