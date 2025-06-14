import { io, Socket } from "socket.io-client";
import { createContext, useContext, useState, useEffect } from "react";
import { SOCKET_SERVER_URL } from "../config";

interface ContextProps {
	socket: Socket | null;
}

const SocketContext = createContext<ContextProps>({
	socket: null,
});

interface props {
	children?: React.ReactNode;
}

export const SocketContextProvider = ({ children }: props) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (socket) return;

		try {
			const soc = io(SOCKET_SERVER_URL);
			setSocket(soc);
		} catch (error) {
			console.log(error);
		}

		return () => {
			if (socket) socket.disconnect();
		};
	}, [socket]);

	return (
		<SocketContext.Provider
			value={{
				socket,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocketContext = () => useContext(SocketContext);
