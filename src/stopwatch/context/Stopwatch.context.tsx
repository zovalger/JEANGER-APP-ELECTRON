import { Socket } from "socket.io-client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useStopwatch from "../hooks/useStopwatch";
import useSound from "../../common/hooks/useSound";
import { useSocketContext } from "../../common/context/Socket.context";
import { IStopwatch } from "../interfaces";
import { StopwatchSocketEvents } from "../enums";
import {
	CreateStopwatchDto,
	RemoveStopwatchDto,
	UpdateStopwatchDto,
} from "../dto";

interface ContextProps {
	sendCreateStopwatch(data: CreateStopwatchDto): void;
	sendUpdateStopwatch(data: UpdateStopwatchDto): void;
	sendDeleteStopwatch(data: RemoveStopwatchDto): void;
	referenceTime: number;
}

const StopwatchContext = createContext<ContextProps>({
	sendCreateStopwatch: (data: IStopwatch): void =>
		console.log("sending stopwatch by socket", data),
	sendUpdateStopwatch: (data: UpdateStopwatchDto): void =>
		console.log("sending stopwatch by socket", data),
	sendDeleteStopwatch: (data: RemoveStopwatchDto): void =>
		console.log("sending stopwatch by socket", data),
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
		s.on(StopwatchSocketEvents.set, (data) => setStopwatch(data, true));
		s.on(StopwatchSocketEvents.remove, (data) => removeStopwatch(data, true));
	};

	useEffect(() => {
		if (socket) setListeners(socket);
	}, [socket]);

	const sendCreateStopwatch = (data: CreateStopwatchDto) => {
		if (!socket) return;
		socket.emit(StopwatchSocketEvents.create, data);
	};

	const sendUpdateStopwatch = (data: UpdateStopwatchDto) => {
		if (!socket) return;
		socket.emit(StopwatchSocketEvents.set, data);
	};

	const sendDeleteStopwatch = (data: RemoveStopwatchDto) => {
		if (!socket) return;
		socket.emit(StopwatchSocketEvents.remove, data);
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
