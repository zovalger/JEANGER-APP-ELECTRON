import { CurrencyType } from "../../common/enums";

export interface PosibleParentDto {
	_id: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
}
