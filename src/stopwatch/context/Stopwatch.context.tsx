"use client";

import { io, Socket } from "socket.io-client";

import CloseIcon from "@mui/icons-material/Close";
import ReactHowler from "react-howler";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Stopwatch, propsWithChildren } from "@/types";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";

import { PROXY } from "@/config";
import { StopwatchEvents } from "@/config/SocketEventsSystem";
import { getAllStopwatchRequest } from "@/api/Stopwatch.api";
import { useSnackbarContext } from "@/contexts/Snackbar.context";
import { Button, IconButton } from "@mui/material";
import { pauseTimer } from "../helpers/Timer.helper";
import { startStopwatch } from "../helpers/Stopwatch.helper";

interface ContextProps {
	stopwatches: Stopwatch[];
	setStopwatches: Dispatch<SetStateAction<Stopwatch[]>>;

	stopwatchData: Stopwatch | null;
	setStopwatchData: Dispatch<SetStateAction<Stopwatch | null>>;

	sendCreateStopwatch(data: Stopwatch): void;
	sendUpdateStopwatch(data: Stopwatch): void;
	sendDeleteStopwatch(_id: string): void;

	referenceTime: number;
}

const StopwatchContext = createContext<ContextProps>({
	stopwatches: [],
	setStopwatches: (): Stopwatch[] => [],
	stopwatchData: null,
	setStopwatchData: (): Stopwatch | null => null,

	sendCreateStopwatch: (data: Stopwatch): void => {},
	sendUpdateStopwatch: (data: Stopwatch): void => {},
	sendDeleteStopwatch: (_id: string): void => {},

	referenceTime: Date.now(),
});

export const StopwatchContextProvider = ({ children }: propsWithChildren) => {
	const { createNotification, closeNotification } = useSnackbarContext();

	const [socket, setSocket] = useState<Socket | null>(null);

	const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

	const [stopwatchData, setStopwatchData] = useState<Stopwatch | null>(null);

	const [referenceTime, setReferenceTime] = useState(Date.now());

	const [soundAlarmPlay, setSoundAlarmPlay] = useState(false);
	const [lastTimer, setLastTimer] = useState("");

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		setInterval(() => {
			const time = Date.now();

			setReferenceTime(time);
		}, 1000);
	}, []);

	useEffect(() => {
		const pasados = stopwatches.filter(
			(item) =>
				item.timeSeted !== null &&
				item.timeDate &&
				item.timeDate < referenceTime
		);

		if (pasados.length) {
			if (pasados[0]._id != lastTimer) {
				setLastTimer(pasados[0]._id);
				createNotification({
					message: `Tiempo terminado: ${pasados[0].name}`,
					autoHideDuration: null,
					action: (
						<>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() => {
									const newStopwatch = startStopwatch(pasados[0]);
									sendUpdateStopwatch(newStopwatch);
									closeNotification();
								}}
							>
								<PlayArrowIcon fontSize="small" sx={{ color: "#0cf7" }} />

								{/* <CloseIcon /> */}
							</IconButton>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() => {
									const newTimer = pauseTimer(pasados[0]);
									sendUpdateStopwatch(newTimer);
									closeNotification();
								}}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</>
					),
				});
			}

			setSoundAlarmPlay(true);
		} else {
			setSoundAlarmPlay(false);
			setLastTimer("");
		}
	}, [referenceTime]);

	useEffect(() => {
		getAllStopwatchRequest()
			.then((data) => setStopwatches(data))
			.catch((error) => console.log(error));
	}, []);

	// ****************************************************************************
	// 										          Funciones de gestion
	// ****************************************************************************

	const updateStopwatch = (data: Stopwatch) => {
		{
			return setStopwatches((prev) => {
				let arr = [];
				const swIndex = prev.findIndex((item) => item._id === data._id);

				if (swIndex < 0) arr = [...prev, data];
				else arr = prev.map((item) => (item._id === data._id ? data : item));

				return arr;
			});
		}
	};

	const deleteStopwatch = (_id: string) =>
		setStopwatches((prev) => prev.filter((item) => item._id !== _id));

	// ****************************************************************************
	// 										          socket Funciones
	// ****************************************************************************

	const setListeners = async (socket: Socket) => {
		socket.on(StopwatchEvents.sendUpdate, updateStopwatch);
		socket.on(StopwatchEvents.delete, deleteStopwatch);
	};

	useEffect(() => {
		if (socket) return;

		try {
			const soc = io(`${PROXY}`);

			setSocket(soc);
			setListeners(soc);
		} catch (error) {
			console.log(error);
		}
		// return () => {
		// 	second;
		// };
	}, [socket]);

	const sendCreateStopwatch = (data: Omit<Stopwatch, "_id">) => {
		if (!socket) return;

		socket.emit(StopwatchEvents.create, data);
	};

	const sendUpdateStopwatch = (data: Stopwatch) => {
		// todo: enviar datos
		updateStopwatch(data);

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
				stopwatches,
				setStopwatches,
				sendCreateStopwatch,
				sendUpdateStopwatch,
				sendDeleteStopwatch,

				stopwatchData,
				setStopwatchData,

				referenceTime,
			}}
		>
			{isClient && (
				<ReactHowler
					src="/sounds/ringtone-126505.mp3"
					playing={soundAlarmPlay}
					volume={0.4}
					html5={true}
				/>
			)}

			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
