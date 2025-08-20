import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SOCKET_SERVER_URL } from "../config";
import useUser from "../../auth/hooks/useUser";

interface ContextProps {
	socket: Socket | null;
	isConnected: boolean;
	createNewConnection(): void;
}

const SocketContext = createContext<ContextProps>({
	socket: null,
	isConnected: false,
	createNewConnection: () => console.log("ejecucion de reconexion al socket"),
});

interface props {
	children?: React.ReactNode;
}

export const SocketContextProvider = ({ children }: props) => {
	const { sessionToken } = useUser();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const createNewConnection = () => {
		try {
			const soc = io(SOCKET_SERVER_URL, {
				// withCredentials: true,
				extraHeaders: {
					"Access-Control-Allow-Origin": "*",
					"x-access-token": sessionToken.token,
				},
			});

			soc.on("connect", () => setIsConnected(true));
			soc.on("disconnect", () => setIsConnected(false));

			setSocket(soc);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (socket) return;
		if (!sessionToken) return;

		createNewConnection();

		return () => {
			if (socket) socket.disconnect();
		};
	}, [socket]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				createNewConnection,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => useContext(SocketContext);
