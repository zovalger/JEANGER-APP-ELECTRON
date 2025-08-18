import Decimal from "decimal.js";
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

	const BSF =
		currencyType === CurrencyType.BSF
			? cost
			: new Decimal(cost).mul(divisaRef).toNumber();

	const divisaCost =
		currencyType == CurrencyType.BSF
			? new Decimal(cost).div(divisaRef).toNumber()
			: cost;

	return { BSF, divisaCost };
};
