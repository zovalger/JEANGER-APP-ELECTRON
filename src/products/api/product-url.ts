export const ProductUrls = {
	base: () => `/product`,
	byId: (id: string) => `/product/${id}`,
	settings: () => `/product-setting`,
	references: () => `/product-reference`,
	referenceById: (id: string) => `/product-reference/${id}`,
	posibleParents: (id: string) => `/product-reference/posible-parents/${id}`,
};
