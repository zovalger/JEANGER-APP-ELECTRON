import { createContext, useContext, useEffect } from "react";
import { IBill } from "../interfaces/bill.interface";
import { useSocketContext } from "../../common/context/Socket.context";
import { BillEvents } from "../enums/BillEvents.enum";

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
	const {socket} =useSocketContext()

	// useEffect(() => {
	// 	getAllBillsRequest()
	// 		.then(setBills)
	// 		.catch((err) => console.log(err));
	// }, []);

	useEffect(() => {
		if (socket)	setListeners(socket);
	}, [socket]);

	const sendBillBroadcast = (data: IBill) => {
		if (!socket) return;
		socket.emit(BillEvents.send, data);
	};

	const sendDeleteBillBroadcast = (_id: string) => {
		if (!socket) return;
		socket.emit(BillEvents.delete, _id);
	};

	const reciveBill = ({ data, oldId }: { data: Bill; oldId: string }) => {
		setBills((prev) => addBillToList(deleteOneBillFromList(prev, oldId), data));
	};

	const reciveDeleteBill = (_id: string) => {
		setBills((prev) => deleteOneBillFromList(prev, _id));
	};

	const setListeners = async (socket: Socket) => {
		socket.on(BillEvents.send, reciveBill);
		socket.on(BillEvents.delete, reciveDeleteBill);
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
