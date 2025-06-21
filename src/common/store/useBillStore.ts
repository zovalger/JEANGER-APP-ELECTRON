import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IBill, IBillItem } from "../../bills/interfaces/bill.interface";
import { initialValuesBill } from "../config/initialValues";

interface IBillState {
	currentBill: IBill | null;
	IVAMode: boolean;
	bills: IBill[];
}

interface IBillActions {
	onSetCurrentBill(bill: IBill): void;

	onSetBills(bills: IBill[]): void;

	onGetBill(bill_id: string): IBill;
	onAddOrUpdateBill(bill_id: string, bill: IBill): void;
	onRemoveBill(bill_id: string): void;

	onAddOrUpdateProduct_in_Bill(bill_id: string, billItem: IBillItem): void;
	onRemoveProduct_in_Bill(bill_id: string, billItemId: string): void;

	onToggleIVAMode(): void;
}

interface IBillStore extends IBillState, IBillActions {}

const useBillStore = create<IBillStore>()(
	persist<IBillStore>(
		(set, get) => ({
			bills: [],
			IVAMode: false,

			currentBill: initialValuesBill,

			onGetBill: (bill_id: string) =>
				get().bills.find((item) => item._id === bill_id) || initialValuesBill,

			onSetCurrentBill: (bill: IBill) => {
				set((state) => ({ ...state, currentBill: bill }));
			},

			onSetBills: (bills: IBill[]) => set((state) => ({ ...state, bills })),

			onAddOrUpdateBill: (bill_id: string, bill: IBill) =>
				set((state) => {
					const { bills } = state;
					const b = bills.find((item) => item._id == bill_id);

					if (!b) return { ...state, bills: [...bills, bill] };

					return {
						...state,
						bills: bills.map((item) => (item._id === bill_id ? bill : item)),
					};
				}),

			onRemoveBill: (bill_id: string) => {
				set((state) => {
					const { bills, currentBill } = state;

					const newBills = bills.filter((item) => item._id !== bill_id);

					const newCurrentBill =
						currentBill._id == bill_id ? initialValuesBill : currentBill;

					return { ...state, bills: newBills, currentBill: newCurrentBill };
				});
			},
			onAddOrUpdateProduct_in_Bill: (
				bill_id: string,
				billItem: IBillItem
			) => {},

			onRemoveProduct_in_Bill: (bill_id: string, billItemId: string) => {},

			onToggleIVAMode: () => {
				set((state) => {
					const { IVAMode } = state;

					return { ...state, IVAMode: !IVAMode };
				});
			},
		}),

		{ name: "bill-store" }
	)
);

export default useBillStore;
