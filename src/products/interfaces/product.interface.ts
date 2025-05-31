import { CurrencyType } from "../../common/enums";

export interface IProduct {
	_id: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	priority: number;
	favorite: boolean;
}
