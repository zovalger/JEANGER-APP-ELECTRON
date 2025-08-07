import { useEffect, useState } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductItem from "../components/ProductItem";
import ProductForm from "../components/ProductForm";
import IconButton from "../../common/components/IconButton";
import Modal from "../../common/components/Modal";

const ProductsScreen = () => {
	const { products, getProductsFromServer } = useProduct();

	const [openModal, setOpenModal] = useState(false);
	const handdleOpenModal = () => setOpenModal(true);
	const handdleCloseModal = () => setOpenModal(false);

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
				<IconButton icon="Plus" onClick={handdleOpenModal} />,
			]}
		>
			<div className="flex flex-col flex-wrap gap-2">
				{products.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>

			<Modal onClose={handdleCloseModal} visible={openModal}>
				<ProductForm callback={handdleCloseModal} />
			</Modal>
		</PageTemplateLayout>
	);
};

export default ProductsScreen;
