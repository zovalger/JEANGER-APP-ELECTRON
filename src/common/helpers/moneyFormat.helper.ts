const moneyFormat = (number: number) => {
	const exp = /(\d)(?=(\d{3})+(?!\d))/g;
	const rep = "$1.";
	const arr = number.toString().split(".");

	let enteros = parseInt(arr[0]);

	if (arr[1]) {
		const decimales_3 = arr[1].slice(0, 3);
		let decimales = parseInt(decimales_3);

		if (decimales_3.slice()[2] && parseInt(decimales_3.slice()[2]) >= 5)
			decimales += 10;

		if (decimales > 1000) enteros += 1;

		const decimalesStr = decimales.toString();

		arr[1] =
			decimales > 1000 ? decimalesStr.slice(1, 3) : decimalesStr.slice(0, 2);
	}

	arr[0] = enteros.toString().replace(exp, rep);

	return arr[1] ? arr.join(",") : arr[0] + ",00";
};

console.log(moneyFormat(0.999));

export default moneyFormat;
