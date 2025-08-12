import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IBill, IBillItem } from "../../bills/interfaces/bill.interface";

interface IBillState {
	currentBill: IBill | null;
	bills: IBill[];
	IVAMode: boolean;
}

interface IBillActions {
	onToggleIVAMode(): void;
	onSetBills(bills: IBill[]): void;
	onSetCurrentBill(bill: IBill): void;
	onGetBill(bill_id: string): IBill;
	onSetBill(bill_id: string, bill: IBill): void;
	onRemoveBill(bill_id: string): void;

	// onSetBillItem(bill_id: string, billItem: IBillItem): void;
	// onRemoveBillItem(bill_id: string, productId: string): void;
}

interface IBillStore extends IBillState, IBillActions {}

const useBillStore = create<IBillStore>()(
	persist<IBillStore>(
		(set, get) => ({
			currentBill: null,
			bills: [],
			IVAMode: false,

			onToggleIVAMode: () =>
				set((state) => ({ ...state, IVAMode: !state.IVAMode })),

			onSetBills: (newBills) =>
				set((state) => {
					const { bills } = state;

					const notSync = bills.filter((item) => !item._id);

					return { ...state, bills: [...notSync, ...newBills] };
				}),

			onSetCurrentBill: (bill) => {
				set((state) => ({ ...state, currentBill: bill }));
			},

			onGetBill: (id) =>
				get().bills.find((item) => item.tempId == id || item._id == id),

			onSetBill: (id, bill) =>
				set((state) => {
					const { bills, currentBill } = state;

					const b = bills.find((item) => item.tempId == id || item._id == id);

					if (!b) return { ...state, bills: [...bills, bill] };

					return {
						...state,
						bills: bills.map((item) =>
							item.tempId == id || item._id == id ? bill : item
						),
						currentBill:
							currentBill?.tempId == id || currentBill?._id == id
								? bill
								: currentBill,
					};
				}),

			onRemoveBill: (id) =>
				set((state) => {
					const { bills, currentBill } = state;

					const newBills = bills.filter(
						(item) => !(item.tempId == id || item._id == id)
					);

					const newCurrentBill =
						currentBill?.tempId == id || currentBill?._id == id
							? null
							: currentBill;

					return { ...state, bills: newBills, currentBill: newCurrentBill };
				}),

			// onSetBillItem: (id, billItem) =>
			// 	set((state) => {
			// 		const { bills, currentBill } = state;

			// 		const b = bills.find((item) =>
			// 			item._id ? item._id == id : item.tempId == id
			// 		);

			// 		if (!b) return state;

			// 		const { items } = b;
			// 		const newItems = items.find(
			// 			(item) => billItem.productId == item.productId
			// 		)
			// 			? items.map((item) =>
			// 					billItem.productId == item.productId ? billItem : item
			// 			  )
			// 			: [...items, billItem];

			// 		b.items = newItems;

			// 		return {
			// 			...state,
			// 			bills: bills.map((item) =>
			// 				item._id == id || item.tempId == id ? b : item
			// 			),
			// 			currentBill:
			// 				currentBill._id == id || currentBill.tempId == id
			// 					? { ...currentBill, items: newItems }
			// 					: currentBill,
			// 		};
			// 	}),

			// onRemoveBillItem: (bill_id, productId) => {},
		}),

		{ name: "bill-store" }
	)
);

export default useBillStore;
