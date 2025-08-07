const RouterLinks = {
	Home: "/",
	Dashboard: "/dashboard",
	Bills: "/dashboard/bills",
	Stopwatchs: "/dashboard/stopwatchs",
	Products: "/dashboard/products",
	NewProduct: "/dashboard/products/new",
	ProductById: (id: string) => "/dashboard/products/" + id,
	// ForeignExchange: "/foreign-exchange",
	// NotFound: "*",
	Login: "auth/login",
	// Register: "/register",
	// Profile: "/profile",
	// Settings: "/settings",
};

export default RouterLinks;
