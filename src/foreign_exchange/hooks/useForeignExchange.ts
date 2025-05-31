import useForeignExchangeStore from "../../common/store/useForeignExchangeStore";

const useForeignExchange = () => {
	const foreignExchange = useForeignExchangeStore(
		(state) => state.foreignExchange
	);

	return { foreignExchange };
};

export default useForeignExchange;
