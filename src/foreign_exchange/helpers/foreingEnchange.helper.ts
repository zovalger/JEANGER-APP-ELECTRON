import { CurrencyType } from "../../common/enums";
import { IForeignExchange } from "../interfaces/ForeignExchange.interface";

export const getCostInBSAndCurrency_helper = (
	foreignExchange: IForeignExchange,
	toCalculate: { currencyType: CurrencyType; cost: number }
) => {
	const { currencyType, cost } = toCalculate;

	const divisaRef =
		currencyType == CurrencyType.BSF || currencyType == CurrencyType.USD
			? foreignExchange.dolar
			: foreignExchange.euro;

	const BSF = currencyType === CurrencyType.BSF ? cost : cost * divisaRef;

	const divisaCost = currencyType == CurrencyType.BSF ? cost / divisaRef : cost;

	return { BSF, divisaCost };
};
