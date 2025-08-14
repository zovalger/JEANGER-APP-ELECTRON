import { Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect } from "react";
import useForeignExchange from "../hooks/useForeignExchange";
import { useSocketContext } from "../../common/context/Socket.context";
import { ForeignExchangeSocketEvents } from "../enums";

const ForeignExchangeContext = createContext({});

interface props {
	children?: React.ReactNode;
}

export const ForeignExchangeContextProvider = ({ children }: props) => {
	// todo: agregar notificaciones
	// const { createNotification, closeNotification } = useSnackbarContext();

	const { socket } = useSocketContext();

	const { getForeignExchange, setForeignExchange } = useForeignExchange();

	useEffect(() => {
		getForeignExchange().catch();
	}, []);

	const setListeners = async (s: Socket) => {
		s.on(ForeignExchangeSocketEvents.set, (res) =>
			setForeignExchange(res.data)
		);
	};

	useEffect(() => {
		if (socket) setListeners(socket);
	}, [socket]);

	return (
		<ForeignExchangeContext.Provider value={{}}>
			{children}
		</ForeignExchangeContext.Provider>
	);
};

export const useForeignExchangeContext = () =>
	useContext(ForeignExchangeContext);
