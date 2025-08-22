const RouterLinks = {
	Home: "/",
	test: "/test",
	Dashboard: "/dashboard",
	Bills: "/dashboard/bills",
	Stopwatchs: "/dashboard/stopwatchs",
	Products: "/dashboard/products",
	NewProduct: "/dashboard/products/new",
	ProductById: (id: string) => "/dashboard/products/" + id,
	ProductSettings: "/dashboard/products/settings",
	// ForeignExchange: "/foreign-exchange",
	// NotFound: "*",
	Login: "auth/login",
	// Register: "/register",
	// Profile: "/profile",
	// Settings: "/settings",
	PhotoEditor: () => "/dashboard/photo-editor",
};

export default RouterLinks;
