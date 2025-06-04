import useForeignExchangeStore from "../../common/store/useForeignExchangeStore";

const useForeignExchange = () => {
	const foreignExchange = useForeignExchangeStore(
		(state) => state.foreignExchange
	);

	const forceScrapForeignExchange = async () => {
		return foreignExchange;
	};

	return { foreignExchange, forceScrapForeignExchange };
};

export default useForeignExchange;
