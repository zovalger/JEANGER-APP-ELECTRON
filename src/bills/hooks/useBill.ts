import { v4 as uuid } from "uuid";
import useBillStore from "../../common/store/useBillStore";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";

import { IBill, IBillItem } from "../interfaces/bill.interface";
import {
	DeleteBillDto,
	DeleteBillFromServerDto,
	DeleteBillItemFromSocketDto,
	RenameBillDto,
	SetBillItemFromSocketDto,
} from "../dto";

import {
	BillItemToText_helper,
	BillToText_helper,
	IBill_CopyToClipboard,
	IBillItem_CopyToClipboard,
} from "../helpers/BillToText.helper";
import { BillUrls } from "../api/bill-url";
import {
	calculateTotals,
	deleteItemInBill,
	updateBillItem,
} from "../helpers/Bill.helpers";
import { useBillContext } from "../context/Bill.context";
import useRequest from "../../common/hooks/useRequest";
import { useEffect, useState } from "react";

export const initialValuesBill: IBill = {
	// _id: "",
	tempId: "",
	name: "",
	items: [],
	// foreignExchange: ForeignExchangeDocument,
	totals: { BSF: 0, USD: 0 },
	// createdBy: "",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

interface Options {
	billId?: string;
}

const useBill = (options?: Options) => {
	const { jeangerApp_API } = useRequest();
	const billContext = useBillContext();
	const { getProduct } = useProduct();
	const { foreignExchange, getCostInBSAndCurrency } = useForeignExchange();

	const currentBill = useBillStore((state) => state.currentBill);
	const bills = useBillStore((state) => state.bills);
	const IVAMode = useBillStore((state) => state.IVAMode);
	const deleteRequests = useBillStore((state) => state.deleteRequests);

	const onToggleIVAMode = useBillStore((state) => state.onToggleIVAMode);
	const onSetBills = useBillStore((state) => state.onSetBills);
	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);
	const onGetBill = useBillStore((state) => state.onGetBill);
	const onSetBill = useBillStore((state) => state.onSetBill);
	const onRemoveBill = useBillStore((state) => state.onRemoveBill);
	const onAddDeleteRequest = useBillStore((state) => state.onAddDeleteRequest);
	const onGetDeleteRequest = useBillStore((state) => state.onGetDeleteRequest);
	const onRemoveDeleteBill = useBillStore((state) => state.onRemoveDeleteBill);

	const [first, setFirst] = useState(true);
	const [bill, setBillProps] = useState<null | IBill>(null);

	// ************************************************************
	// 										functions
	// ************************************************************
	const getAllBills = async () => {
		try {
			const { data } = await jeangerApp_API.get<IBill[]>(BillUrls.base());

			onSetBills(data);

			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getBill = async (id: string) => {
		try {
			const data = onGetBill(id);

			if (!data) throw new Error("no encontrado");

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	const setBill = async (bill: IBill, disableSync = false) => {
		const { _id, tempId, updatedAt } = bill;

		try {
			const t = await getBill(tempId);

			if (disableSync)
				if (new Date(updatedAt).getTime() < new Date(t.updatedAt).getTime())
					return;
		} catch (error) {
			console.log(error);
		}

		const newBill = { ...bill };

		onSetBill(tempId || _id, newBill);

		return newBill;
	};

	const addDeleteRequest = async (deleteBillDto: DeleteBillFromServerDto) => {
		const { userId, data } = deleteBillDto;

		try {
			const t = await getBill(data._id);

			if (t.createdBy == userId) throw new Error("");

			onAddDeleteRequest(deleteBillDto);
		} catch (error) {
			console.log(error);
			await removeBill(data);
		}
	};

	const removeDeleteRequest = async (billId: string, keep = false) => {
		const req = onGetDeleteRequest(billId);

		try {
			if (!req) throw new Error("esto no deberia de pasar");

			onRemoveDeleteBill(billId);

			const bill = await getBill(billId);

			if (keep) {
				const newBill = await createBill(bill.name, bill.items);

				if (currentBill?._id == billId) await selectBill(newBill.tempId);
			} else if (currentBill?._id == billId) {
				const newBill = await createBill();
				await selectBill(newBill.tempId);
			}

			await removeBill(req.data, true);
		} catch (error) {
			console.log(error);
		}
	};

	const removeBill = async (
		deleteBillDto: DeleteBillDto,
		disableSync = false
	) => {
		const { _id, updatedAt } = deleteBillDto;

		const t = await getBill(_id);

		if (new Date(updatedAt).getTime() < new Date(t.updatedAt).getTime()) return;

		onRemoveBill(_id);

		if (billContext && !disableSync)
			billContext.sendDeleteBill({ ...deleteBillDto, _id: t._id });
	};

	const createBill = async (name?: string, items?: IBillItem[]) => {
		const id = uuid();

		const n = new Date().toISOString();

		const toSave: IBill = {
			...initialValuesBill,
			name: name || "",
			tempId: id,
			createdAt: n,
			updatedAt: n,
		};

		if (items) {
			toSave.items = items.map(({ createdBy, ...rest }) => rest);
			toSave.totals = calculateTotals(items, foreignExchange);
		}

		try {
			// todo: hacer request
			const { data } = await jeangerApp_API.post<IBill>(
				BillUrls.base(),
				toSave
			);

			onSetBill(data._id, data);

			return data;
		} catch (error) {
			console.log(error);
			onSetBill(id, toSave);
		}

		return toSave;
	};

	const renameBill = async (data: RenameBillDto, disableSync = false) => {
		const bill = await getBill(data._id);

		const newBill = await setBill(
			{
				...bill,
				name: data.name,
				updatedAt: data.updatedAt,
			},
			true
		);

		if (billContext && !disableSync)
			billContext.sendRenameBill({ ...data, _id: bill._id });

		return newBill;
	};

	// *****************************************************

	const setItem = async (
		data: SetBillItemFromSocketDto,
		options?: { setQuantity?: boolean; disableSync?: boolean }
	) => {
		const disableSync = options?.disableSync || false;
		const setQuantity = options?.setQuantity || false;

		console.log(data);

		const { billId, productId, updatedAt, ...rest } = data;

		const bill = await getBill(billId);

		try {
			const { cost, currencyType } = await getProduct(productId);

			const newItemBill: IBillItem = {
				...rest,
				cost,
				currencyType,
				productId,
				updatedAt,
			};

			// todo: no permitir actualizaciones viejas

			const { items, totals, updatedItem } = updateBillItem(
				bill.items,
				newItemBill,
				foreignExchange,
				{ setQuantity }
			);

			const newBill = { ...bill, items, totals };

			await setBill(newBill, true);

			console.log(updatedItem);

			if (billContext && !disableSync)
				billContext.sendSetItem({
					...data,
					billId: bill._id,
					quantity: updatedItem.quantity,
				});

			return updatedItem;
		} catch (error) {
			console.log(error);
		}
	};

	const removeItem = async (
		data: DeleteBillItemFromSocketDto,
		options?: { disableSync: boolean }
	) => {
		const disableSync = options?.disableSync || false;
		const { billId, productId, updatedAt } = data;

		try {
			const bill = await getBill(billId);

			const { items, totals, updatedItem } = deleteItemInBill(
				bill.items,
				productId,
				foreignExchange
			);

			await setBill({ ...bill, items, totals });

			if (billContext && !disableSync)
				billContext.sendDeleteItem({ ...data, billId: bill._id });
		} catch (error) {
			console.log(error);
		}
	};

	const clear_CurrentBill = async () => {
		const bill = await createBill("");
		await selectBill(bill.tempId);
		await removeBill({
			_id: currentBill.tempId,
			updatedAt: new Date().toISOString(),
		});
	};

	// ************************************************************
	// 										facturas guardadas
	// ************************************************************

	const selectBill = async (bill_id: string, disableSync = false) => {
		// if (currentBill.items.length) saveCurrentBill();

		const selectedBill = await getBill(bill_id);

		onSetCurrentBill(selectedBill);

		if (billContext && !disableSync)
			console.log("envio por socket", "seleccion de bill");
	};

	const billItemToText = async (item: IBillItem_CopyToClipboard) =>
		BillItemToText_helper(item);

	const billToText = async (bill: IBill) => {
		const convertedItems: IBillItem_CopyToClipboard[] = await Promise.all(
			bill.items.map(async (item) => {
				const { productId, cost, currencyType, quantity } = item;
				const { name } = await getProduct(productId);
				const { BSF } = getCostInBSAndCurrency({ currencyType, cost });

				return {
					productName: name,
					cost: BSF,
					currencyType: "bs",
					quantity,
				};
			})
		);

		const b: IBill_CopyToClipboard = { ...bill, items: convertedItems };

		return BillToText_helper({ bill: b, foreignExchange });
	};

	useEffect(() => {
		if (!first) return;
		setFirst(false);

		if (!options) return;

		if (options.billId) {
			try {
				getBill(options.billId).then((data) => setBillProps(data));
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return {
		bill,
		bills,
		currentBill,
		IVAMode,
		deleteRequests,
		addDeleteRequest,
		removeDeleteRequest,

		getAllBills,
		getBill,
		setBill,
		removeBill,
		createBill,
		renameBill,
		setItem,
		removeItem,
		selectBill,
		clear_CurrentBill,
		// comodidades
		billToText,
		billItemToText,
		toggleIVAMode: onToggleIVAMode,
	};
};

export default useBill;
