import { useEffect, useState } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductItem from "../components/ProductItem";
import ProductForm from "../components/ProductForm";
import IconButton from "../../common/components/IconButton";
import Modal from "../../common/components/Modal";
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
				<IconButton icon="Refresh" onClick={getProductsFromServer} />,
				<IconButton icon="Plus" href={RouterLinks.NewProduct} />,
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
