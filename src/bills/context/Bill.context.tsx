import { createContext, useContext, useEffect } from "react";
import { IBill } from "../interfaces/bill.interface";
import { useSocketContext } from "../../common/context/Socket.context";
import { BillEvents } from "../enums/BillEvents.enum";
import useBill from "../hooks/useBill";
import { Socket } from "socket.io-client";

interface ContextProps {
	sendBillBroadcast(data: IBill): void;
	sendDeleteBillBroadcast(_id: string): void;
}

const BillContext = createContext<ContextProps>({
	sendBillBroadcast: (data: IBill) =>
		console.log("sending bill by socket", data),
	sendDeleteBillBroadcast: (id: string) =>
		console.log("sending bill by socket", id),
});

interface props {
	children?: React.ReactNode;
}

export const BillContextProvider = ({ children }: props) => {
	// lista de todos los billos
	const { socket } = useSocketContext();
	const { getAllBills, addOrUpdateBill, removeBill } = useBill();

	useEffect(() => {
		getAllBills();
	}, []);

	useEffect(() => {
		if (socket) setListeners(socket);
	}, [socket]);

	const reciveBill = ({ data, oldId }: { data: IBill; oldId: string }) => {
		console.log(data);

		removeBill(oldId, { resend: false });
		addOrUpdateBill(data, { resend: false });
	};

	const reciveDeleteBill = (_id: string) => removeBill(_id, { resend: false });

	const setListeners = async (s: Socket) => {
		s.on(BillEvents.send, reciveBill);
		s.on(BillEvents.delete, reciveDeleteBill);
	};

	// send methods
	const sendBillBroadcast = (data: IBill) => {
		if (!socket) return;
		socket.emit(BillEvents.send, data);
	};

	const sendDeleteBillBroadcast = (_id: string) => {
		if (!socket) return;
		socket.emit(BillEvents.delete, _id);
	};

	return (
		<BillContext.Provider
			value={{
				sendBillBroadcast,
				sendDeleteBillBroadcast,
			}}
		>
			{children}
		</BillContext.Provider>
	);
};

export const useBillContext = () => useContext(BillContext);
