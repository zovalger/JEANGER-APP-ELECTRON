import { IProduct } from "../interfaces/product.interface";

export const searchProductsByWord = (
	query: string,
	products: IProduct[]
): IProduct[] => {
	if (!products.length) return products;

	const regExps = query
		.trim()
		.replace(/(^(\+|\-)\d{1,})|(^(\+|\-))/, "")
		.split(" ")
		.filter((word) => !!word)
		.map((word) => new RegExp(`${word}`, "i"));

	const resultProducts = products.filter((prod) => {
		let score = 0;

		regExps.map((reg) => {
			if (prod.allKeywords.find((i) => reg.test(i))) score++;
		});

		return score >=
			Math.floor(regExps.length > 5 ? regExps.length - 1 : regExps.length)
			? true
			: false;
	});

	return resultProducts;
};

export const sortProductByPriority = (products: IProduct[]): IProduct[] => {
	return products.sort((a, b) => (a.priority > b.priority ? -1 : 1));
};

export const getOnlyFavoriteProduct = (products: IProduct[]): IProduct[] => {
	return products.filter((product) => product.favorite);
};
