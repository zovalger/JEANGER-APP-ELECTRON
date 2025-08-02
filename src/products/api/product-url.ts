export const ProductUrls = {
	product: () => `/product`,
	productById: (id: string) => `/product/${id}`,
	productSettings: () => `/product-setting`,
	productReferences: () => `/product-reference`,
	productPosibleParents: (id: string) =>
		`/product-reference/posible-parents/${id}`,
};
