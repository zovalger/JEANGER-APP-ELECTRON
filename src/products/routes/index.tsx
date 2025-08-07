import { Route } from "react-router";
import ProductsScreen from "../screens/ProductsScreen";
import NewProductScreen from "../screens/NewProductScreen";
import ProductScreen from "../screens/ProductScreen";

const ProductRoutes = () => {
	return (
		<Route path="products">
			<Route index element={<ProductsScreen />} />
			<Route path="new" element={<NewProductScreen />} />
			<Route path=":id" element={<ProductScreen />} />
		</Route>
	);
};

export default ProductRoutes;
