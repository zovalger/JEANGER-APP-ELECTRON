import { CurrencyType } from "../../common/enums";

export interface CreateProductDto {
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	priority: number;
	favorite: boolean;
	instructions: string;
}
