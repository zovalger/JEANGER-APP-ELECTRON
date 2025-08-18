const moneyFormat = (number: number, IntWithDecimals = true) => {
	return IntWithDecimals || number % 1 != 0
		? number.toFixed(2).replace(".", ",")
		: number;
};

console.log(moneyFormat(0.999));

export default moneyFormat;
