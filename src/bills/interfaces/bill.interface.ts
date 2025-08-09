import { CurrencyType } from "../../common/enums";
export interface IBillItem {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}

export interface ITotals {
	BSF: number;
	USD: number;
}

export interface IBill {
	_id: string;
	tempId: string;
	name: string;
	items: IBillItem[];
	// foreignExchange: ForeignExchangeDocument;
	totals: ITotals;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}
