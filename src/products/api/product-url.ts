export const ProductUrls = {
	base: () => `/product`,
	byId: (id: string) => `/product/${id}`,
	settings: () => `/product-setting`,
	references: () => `/product-reference`,
	posibleParents: (id: string) => `/product-reference/posible-parents/${id}`,
};
