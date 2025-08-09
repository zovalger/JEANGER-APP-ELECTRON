import { CurrencyType } from "../../common/enums";
import useRequest from "../../common/hooks/useRequest";
import useForeignExchangeStore from "../../common/store/useForeignExchangeStore";
import { ForeignExchangeUrls } from "../api/foreign-exchange-url";
import { getCostInBSAndCurrency_helper } from "../helpers/foreingEnchange.helper";
import { IForeignExchange } from "../interfaces/ForeignExchange.interface";

export const initialValuesForeignExchange: IForeignExchange = {
	dolar: 0,
	euro: 0,
	bankBusinessDate: "",
	createdBy: "",
	createdAt: "",
	updatedAt: "",
};

const useForeignExchange = () => {
	const { jeangerApp_API } = useRequest();

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

	// ***************** consultas	*****************

	const getForeignExchange = async () => {
		try {
			onSetLoadingForeignExchange(true);

			const { data } = await jeangerApp_API.get<IForeignExchange>(
				ForeignExchangeUrls.Last()
			);

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

			const { data } = await jeangerApp_API.get<IForeignExchange>(
				ForeignExchangeUrls.Force()
			);

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
		if (!foreignExchange) throw new Error("new");

		return getCostInBSAndCurrency_helper(foreignExchange, toCalculate);
	};

	return {
		foreignExchange,
		loadingForeignExchange,
		getForeignExchange,
		forceScrapForeignExchange,
		getCostInBSAndCurrency,
	};
};

export default useForeignExchange;
