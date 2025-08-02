import { Route } from "react-router";
import ProductsScreen from "../screens/ProductsScreen";

const ProductRoutes = () => {
	return (
		<Route path="products">
			<Route index element={<ProductsScreen />} />
		</Route>
	);
};

export default ProductRoutes;
