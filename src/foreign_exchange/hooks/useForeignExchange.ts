import { CurrencyType } from "../../common/enums";
import useForeignExchangeStore from "../../common/store/useForeignExchangeStore";
import { getForeignExchangeRequest } from "../api/ForeignExchange.api";
import { getCostInBSAndCurrency_helper } from "../helpers/foreingEnchange.helper";

const useForeignExchange = () => {
	const foreignExchange = useForeignExchangeStore(
		(state) => state.foreignExchange
	);

	const loadingForeignExchange = useForeignExchangeStore(
		(state) => state.loadingForeignExchange
	);

	const onSetForeignExchange = useForeignExchangeStore(
		(state) => state.onSetForeignExchange
	);

	const onSetLoadingForeignExchange = useForeignExchangeStore(
		(state) => state.onSetLoadingForeignExchange
	);

	const getForeignExchange = async () => {
		try {
			onSetLoadingForeignExchange(true);

			const data = await getForeignExchangeRequest();

			onSetForeignExchange(data);
		} catch (error) {
			console.log(error);
			onSetLoadingForeignExchange(false);

			throw new Error("not found");
		}

		onSetLoadingForeignExchange(false);
	};

	const forceScrapForeignExchange = async () => {
		try {
			onSetLoadingForeignExchange(true);

			const data = await getForeignExchangeRequest();

			onSetForeignExchange(data);
		} catch (error) {
			console.log(error);
			onSetLoadingForeignExchange(false);

			throw new Error("not found");
		}

		onSetLoadingForeignExchange(false);
	};

	const getCostInBSAndCurrency = (toCalculate: {
		currencyType: CurrencyType;
		cost: number;
	}) => {
		if (!foreignExchange) return;

		return getCostInBSAndCurrency_helper(foreignExchange, toCalculate);
	};

	return {
		foreignExchange,
		loadingForeignExchange,
		getForeignExchange,
		forceScrapForeignExchange,
		getCostInBSAndCurrency
	};
};

export default useForeignExchange;
