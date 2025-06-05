import { create } from "zustand";
import { IForeignExchange } from "../../foreign_exchange/interfaces/ForeignExchange.interface";
import { persist } from "zustand/middleware";
import { initialValuesForeignExchange } from "../config/initialValues";

interface IForeignExchangeState {
	foreignExchange: IForeignExchange;
	loadingForeignExchange: boolean;
}

interface IForeignExchangeActions {
	onSetForeignExchange: (foreignExchange: IForeignExchange) => void;
	onSetLoadingForeignExchange: (loading: boolean) => void;
	onRemoveForeignExchanges: () => void;
}

interface IForeignExchangeStore
	extends IForeignExchangeState,
		IForeignExchangeActions {}

const useForeignExchangeStore = create<IForeignExchangeStore>()(
	persist<IForeignExchangeStore>(
		(set) => ({
			foreignExchange: undefined,
			loadingForeignExchange: false,

			onSetForeignExchange: (foreignExchange: IForeignExchange) =>
				set((state) => ({ ...state, foreignExchange })),

			onRemoveForeignExchanges: () =>
				set((state) => ({ ...state, foreignExchanges: undefined })),

			onSetLoadingForeignExchange: (loading: boolean) =>
				set((state) => ({ ...state, loadingForeignExchange: loading })),
		}),

		{ name: "foreign-exchange-store" }
	)
);

export default useForeignExchangeStore;
