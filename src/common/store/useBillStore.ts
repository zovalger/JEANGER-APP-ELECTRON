import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IBill, IBillItem } from "../../bills/interfaces/bill.interface";
import { initialValuesBill } from "../config/initialValues";

interface IBillState {
	currentBill: IBill | null;
	bills: IBill[];
}

interface IBillActions {
	onSetCurrentBill(bill: IBill): void;

	onAddOrUpdateBill(bill_id: string, bill: IBill): void;
	onRemoveBill(bill_id: string): void;

	onAddOrUpdateProduct_in_Bill(bill_id: string, billItem: IBillItem): void;
	onRemoveProduct_in_Bill(bill_id: string, billItemId: string): void;
}

interface IBillStore extends IBillState, IBillActions {}

const useBillStore = create<IBillStore>()(
	persist<IBillStore>(
		(set) => ({
			bills: [],
			currentBill: initialValuesBill,

			onSetCurrentBill: (bill: IBill) => {
				set((state) => ({ ...state, currentBill: bill }));
			},


			onAddOrUpdateBill: (bill_id: string, bill: IBill) =>
				set((state) => {
					const { bills } = state;
					const b = bills.find((item) => item._id == bill_id);

					if (!b) return { ...state, bills: [...bills, bill] };

					console.log("no encontrado",b);
					

					return {
						...state,
						bills: bills.map((item) => (item._id === bill_id ? bill : item)),
					};
				}),

			onRemoveBill: (bill_id: string) => {},
			onAddOrUpdateProduct_in_Bill: (
				bill_id: string,
				billItem: IBillItem
			) => {},
			onRemoveProduct_in_Bill: (bill_id: string, billItemId: string) => {},
		}),

		{ name: "bill-store" }
	)
);

export default useBillStore;
