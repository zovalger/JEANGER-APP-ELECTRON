export const ForeignExchangeUrls = {
	base: () => `/foreign-exchange`,
	Last: () => `/foreign-exchange/last`,
	Force: () => `/foreign-exchange/scraping`,
	ById: (id: string) => `/foreign-exchange/${id}`,
};
