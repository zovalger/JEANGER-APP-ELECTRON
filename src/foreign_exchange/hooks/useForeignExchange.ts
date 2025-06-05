import useForeignExchangeStore from "../../common/store/useForeignExchangeStore";
import { getForeignExchangeRequest } from "../api/ForeignExchange.api";

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

	return { foreignExchange, loadingForeignExchange, forceScrapForeignExchange };
};

export default useForeignExchange;
