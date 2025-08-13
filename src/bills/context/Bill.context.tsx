import { Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect } from "react";
import { useSocketContext } from "../../common/context/Socket.context";
import useBill from "../hooks/useBill";
import {
	DeleteBillDto,
	DeleteBillFromServerDto,
	DeleteBillItemFromSocketDto,
	RenameBillDto,
	SetBillItemFromSocketDto,
} from "../dto";
import { BillSocketEvents } from "../enums";
import useProduct from "../../products/hooks/useProduct";

interface ContextProps {
	sendRenameBill(data: RenameBillDto): void;
	sendDeleteBill(data: DeleteBillDto): void;
	sendSetItem(data: SetBillItemFromSocketDto): void;
	sendDeleteItem(data: DeleteBillItemFromSocketDto): void;
}

const BillContext = createContext<ContextProps>({
	sendRenameBill: (data: RenameBillDto) =>
		console.log("sending bill by socket", data),
	sendDeleteBill: (data: DeleteBillDto) =>
		console.log("sending bill by socket", data),
	sendSetItem: (data: SetBillItemFromSocketDto) =>
		console.log("sending bill by socket", data),
	sendDeleteItem: (data: DeleteBillItemFromSocketDto) =>
		console.log("sending bill by socket", data),
});

interface props {
	children?: React.ReactNode;
}

export const BillContextProvider = ({ children }: props) => {
	// lista de todos los billos
	const { socket } = useSocketContext();
	const {
		getAllBills,
		setBill,
		renameBill,
		addDeleteRequest,
		setItem,
		removeItem,
	} = useBill();
	const { getProductsFromServer } = useProduct();

	useEffect(() => {
		getAllBills();
		getProductsFromServer();
	}, []);

	useEffect(() => {
		if (socket) setListeners(socket);
	}, [socket]);

	const setListeners = async (s: Socket) => {
		s.on(BillSocketEvents.set, ({ data }) => setBill(data, true));

		s.on(BillSocketEvents.rename, ({ data }) => renameBill(data, true));

		s.on(BillSocketEvents.remove, (res: DeleteBillFromServerDto) =>
			addDeleteRequest(res)
		);

		s.on(BillSocketEvents.setItem, ({ data, billId }) =>
			setItem({ ...data, billId }, { disableSync: true, setQuantity: true })
		);

		s.on(BillSocketEvents.removeItem, ({ data, billId }) =>
			removeItem({ ...data, billId }, { disableSync: true })
		);
	};

	const sendRenameBill = (data: RenameBillDto) => {
		if (!socket) return;
		socket.emit(BillSocketEvents.rename, data);
	};

	const sendDeleteBill = (data: DeleteBillDto) => {
		if (!socket) return;
		socket.emit(BillSocketEvents.remove, data);
	};

	const sendSetItem = (data: SetBillItemFromSocketDto) => {
		if (!socket) return;
		socket.emit(BillSocketEvents.setItem, data);
	};

	const sendDeleteItem = (data: DeleteBillItemFromSocketDto) => {
		if (!socket) return;
		socket.emit(BillSocketEvents.removeItem, data);
	};

	return (
		<BillContext.Provider
			value={{
				sendRenameBill,
				sendDeleteBill,
				sendSetItem,
				sendDeleteItem,
			}}
		>
			{children}
		</BillContext.Provider>
	);
};

export const useBillContext = () => useContext(BillContext);
