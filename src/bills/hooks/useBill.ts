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
import { getAllBillsRequest } from "../api/Bill.api";
import { useBillContext } from "../context/Bill.context";
import {
	BillItemToText_helper,
	BillToText_helper,
	IBill_CopyToClipboard,
	IBillItem_CopyToClipboard,
} from "../helpers/BillToText.helper";
import { CurrencyType } from "../../common/enums";

interface ComunicationOption {
	resend?: boolean;
}

const defaultOptions: ComunicationOption = {
	resend: true,
};
const useBill = () => {
	const billContext = useBillContext();
	const { getProduct } = useProduct();
	const { foreignExchange, getCostInBSAndCurrency } = useForeignExchange();

	const bills = useBillStore((state) => state.bills);
	const currentBill = useBillStore((state) => state.currentBill);

	const onGetBill = useBillStore((state) => state.onGetBill);
	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);
	const onSetBills = useBillStore((state) => state.onSetBills);
	const onAddOrUpdateBill = useBillStore((state) => state.onAddOrUpdateBill);
	const onRemoveBill = useBillStore((state) => state.onRemoveBill);
	// const onAddOrUpdateProduct_in_Bill = useBillStore(
	// 	(state) => state.onAddOrUpdateProduct_in_Bill
	// );
	// const onRemoveProduct_in_Bill = useBillStore(
	// 	(state) => state.onRemoveProduct_in_Bill
	// );

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
			// addOrUpdateBill(newBill);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProduct_To_CurrentBill = (productId: string) => {
		const newBill = deleteItemInBill(currentBill, foreignExchange, productId);

		setCurrentBill(newBill);
	};

	const clear_CurrentBill = () => setCurrentBill(clearBill());

	// ************************************************************
	// 										facturas guardadas
	// ************************************************************

	const getAllBills = async () => {
		try {
			const allBills = await getAllBillsRequest();

			onSetBills(allBills);
		} catch (error) {
			console.log(error);
		}
	};

	const addOrUpdateBill = (
		bill: IBill,
		options: ComunicationOption = defaultOptions
	) => {
		onAddOrUpdateBill(bill._id, bill);

		if (billContext && options?.resend) {
			console.log("envio por socket", bill);
			billContext.sendBillBroadcast(bill);
		}
	};

	const saveCurrentBill = (options: ComunicationOption = defaultOptions) => {
		const toSave: IBill = currentBill._id
			? currentBill
			: { ...currentBill, _id: uuid() };

		addOrUpdateBill(toSave);
		clear_CurrentBill();

		if (billContext && options?.resend) console.log("envio por socket");
	};

	const selectBill = (
		bill_id: string,
		options: ComunicationOption = defaultOptions
	) => {
		if (currentBill.items.length) saveCurrentBill();

		const selectedBill = onGetBill(bill_id);
		setCurrentBill(selectedBill);

		if (billContext && options?.resend)
			console.log("envio por socket", "seleccion de bill");
	};

	const removeBill = (
		bill_id: string,
		options: ComunicationOption = defaultOptions
	) => {
		onRemoveBill(bill_id);

		if (billContext && options?.resend) {
			console.log("envio por socket", bill_id);
			billContext.sendDeleteBillBroadcast(bill_id);
		}
	};

	// const addOrUpdateProductBill = (
	// 	bill_id: string,
	// 	billItem: IBillItem,
	// 	options: ComunicationOption = defaultOptions
	// ) => {
	// 	onAddOrUpdateProduct_in_Bill(bill_id, billItem);
	// };

	// const removeProductBill = (
	// 	bill_id: string,
	// 	billItemId: string,
	// 	options: ComunicationOption = defaultOptions
	// ) => {
	// 	onRemoveProduct_in_Bill(bill_id, billItemId);
	// };

	const billItemToText = (item: IBillItem_CopyToClipboard) =>
		BillItemToText_helper(item);

	const billToText = (bill: IBill) => {
		const convertedItems: IBillItem_CopyToClipboard[] = bill.items.map(
			(item) => {
				const { productId, cost, currencyType, quantity } = item;
				const { name } = getProduct(productId);
				const { BSF } = getCostInBSAndCurrency({ currencyType, cost });

				return {
					productName: name,
					cost: BSF,
					currencyType: "bs",
					quantity,
				};
			}
		);

		const b: IBill_CopyToClipboard = { ...bill, items: convertedItems };

		return BillToText_helper({ bill: b, foreignExchange });
	};

	return {
		bills,
		currentBill,
		setCurrentBill,
		addOrUpdateProduct_To_CurrentBill,
		deleteProduct_To_CurrentBill,
		clear_CurrentBill,

		// saved bills
		getAllBills,
		saveCurrentBill,
		selectBill,
		addOrUpdateBill,
		removeBill,
		// addOrUpdateProductBill,
		// removeProductBill,

		// comodidades
		billToText,
		billItemToText,
	};
};

export default useBill;
