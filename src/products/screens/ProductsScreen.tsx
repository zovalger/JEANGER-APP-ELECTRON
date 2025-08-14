import { useEffect } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductItem from "../components/ProductItem";
import IconButton from "../../common/components/IconButton";
import RouterLinks from "../../common/config/RouterLinks";

const ProductsScreen = () => {
	const { products, getProductsFromServer } = useProduct();

	useEffect(() => {
		getProductsFromServer()
			.then()
			.catch((err) => console.log(err));
	}, []);

	return (
		<PageTemplateLayout
			name="Productos"
			nameHelp="Todos los productos creados"
			rightButtons={[
				<IconButton icon="Plus" href={RouterLinks.NewProduct} />,
				<IconButton icon="Refresh" onClick={getProductsFromServer} />,
				<IconButton icon="Gear" href={RouterLinks.ProductSettings} />,
			]}
		>
			<div className="flex flex-col flex-wrap gap-2">
				{products.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>
		</PageTemplateLayout>
	);
};

export default ProductsScreen;
