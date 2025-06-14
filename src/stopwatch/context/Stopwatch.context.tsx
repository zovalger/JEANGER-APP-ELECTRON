import { Socket } from "socket.io-client";
import { createContext, useContext, useState, useEffect } from "react";
import { Stopwatch } from "../interfaces/Stopwatch.interface";
import useStopwatch from "../hooks/useStopwatch";
import { StopwatchEvents } from "../enums/StopwatchEvents.enum";
import useSound from "../../common/hooks/useSound";
import { useSocketContext } from "../../common/context/Socket.context";

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
	// todo: agregar notificaciones
	// const { createNotification, closeNotification } = useSnackbarContext();

	const { socket } = useSocketContext();
	const { activeSound, unactiveSound } = useSound();
	
	const { getExpiredTimers, getAllStopwatch, setStopwatch, removeStopwatch } =
	useStopwatch();
	
	const [referenceTime, setReferenceTime] = useState(Date.now());

	useEffect(() => {
		setInterval(() => {
			const time = Date.now();
			setReferenceTime(time);

			const pasados = getExpiredTimers(time);

			if (pasados.length) activeSound("StopwatchAlarm");
			else unactiveSound("StopwatchAlarm");
		}, 1000);
	}, []);

	useEffect(() => {
		getAllStopwatch().catch();
	}, []);

	const setListeners = async (s: Socket) => {
		s.on(StopwatchEvents.sendUpdate, setStopwatch);
		s.on(StopwatchEvents.delete, removeStopwatch);
	};

	useEffect(() => {
		if (socket) setListeners(socket);
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
			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
