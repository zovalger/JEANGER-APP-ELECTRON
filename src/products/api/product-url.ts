export const ProductUrls = {
	base: () => `/product`,
	byId: (id: string) => `/product/${id}`,
	settings: () => `/product-setting`,
	settingsById: (id: string) => `/product-setting/${id}`,
	references: () => `/product-reference`,
	referenceById: (id: string) => `/product-reference/${id}`,
	posibleParents: (id: string) => `/product-reference/posible-parents/${id}`,
};
