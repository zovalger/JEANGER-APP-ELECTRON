import { useEffect } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductItem from "../components/ProductItem";

const ProductsScreen = () => {
	const { products, getAllProductsWithServer } = useProduct();

	useEffect(() => {
		getAllProductsWithServer()
			.then()
			.catch((err) => console.log(err));
	}, []);

	return (
		<PageTemplateLayout name="Productos" nameHelp="Todos los productos creados">
			<div className="flex flex-col flex-wrap gap-4">
				{products.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>
		</PageTemplateLayout>
	);
};

export default ProductsScreen;
