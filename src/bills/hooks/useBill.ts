import { v4 as uuid } from "uuid";
import useBillStore from "../../common/store/useBillStore";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";

import {
	clearBill,
	deleteItemInBill,
	updateBillItem,
} from "../helpers/Bill.helpers";

import { IBill, IBillItem } from "../interfaces/bill.interface";

interface ComunicationOption {
	resend?: boolean;
}

const useBill = () => {
	const { getProduct } = useProduct();
	const { foreignExchange } = useForeignExchange();

	const bills = useBillStore((state) => state.bills);
	const currentBill = useBillStore((state) => state.currentBill);

	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);
	const onAddOrUpdateBill = useBillStore((state) => state.onAddOrUpdateBill);
	const onRemoveBill = useBillStore((state) => state.onRemoveBill);
	const onAddOrUpdateProduct_in_Bill = useBillStore(
		(state) => state.onAddOrUpdateProduct_in_Bill
	);
	const onRemoveProduct_in_Bill = useBillStore(
		(state) => state.onRemoveProduct_in_Bill
	);

	// ************************************************************
	// 										functions
	// ************************************************************

	const setCurrentBill = (bill: IBill) => onSetCurrentBill(bill);

	const addOrUpdateProduct_To_CurrentBill = async (
		productId: string,
		quantity?: number,
		options?: { setQuantity?: boolean }
	) => {
		try {
			const newItemBill: IBillItem = {
				productId,
				quantity: quantity ? quantity : 1,
				cost: getProduct(productId).cost,
				currencyType: getProduct(productId).currencyType,
			};

			const newBill = updateBillItem(
				currentBill,
				newItemBill,
				foreignExchange,
				options
			);

			setCurrentBill(newBill);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProduct_To_CurrentBill = (productId: string) => {
		const newBill = deleteItemInBill(currentBill, foreignExchange, productId);

		setCurrentBill(newBill);
	};

	const clear_CurrentBill = () => setCurrentBill(clearBill());

	// 	getAllBillsRequest()
	// 		.then(setBills)
	// 		.catch((err) => console.log(err));

	const addOrUpdateBill = (bill: IBill, options?: ComunicationOption) => {
		onAddOrUpdateBill(bill._id, bill);

		if (options?.resend) console.log("envio por socket", bill);
	};

	const removeBill = (bill_id: string, options?: ComunicationOption) => {
		onRemoveBill(bill_id);

		if (options?.resend) console.log("envio por socket", bill_id);
	};

	const addOrUpdateProductBill = (
		bill_id: string,
		billItem: IBillItem,
		options?: ComunicationOption
	) => {
		onAddOrUpdateProduct_in_Bill(bill_id, billItem);
	};

	const removeProductBill = (
		bill_id: string,
		billItemId: string,
		options?: ComunicationOption
	) => {
		onRemoveProduct_in_Bill(bill_id, billItemId);
	};

	const selectBill = (bill_id: string, options?: ComunicationOption) => {
		// onRemoveProduct_in_Bill(bill_id, billItemId);
	};

	const saveCurrentBill = (options?: ComunicationOption) => {
		const toSave: IBill = currentBill._id.length
			? { ...currentBill, _id: uuid() }
			: currentBill;

			console.log(currentBill._id.length);
			console.log(toSave);

		addOrUpdateBill(toSave);
		clear_CurrentBill();

		if (options?.resend) console.log("envio por socket");
	};

	return {
		bills,
		currentBill,
		setCurrentBill,
		addOrUpdateProduct_To_CurrentBill,
		deleteProduct_To_CurrentBill,
		clear_CurrentBill,

		// saved bills
		saveCurrentBill,
		selectBill,
		addOrUpdateBill,
		removeBill,
		addOrUpdateProductBill,
		removeProductBill,
	};
};

export default useBill;
