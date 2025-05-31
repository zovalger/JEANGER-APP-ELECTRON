import useProduct from "../hooks/useProduct";

const ProductsScreen = () => {
	const { products } = useProduct();

	return (
		<div>
			<div>{products.length}</div>

			{products.map((item) => (
				<div key={item._id}>{item.name}</div>
			))}
		</div>
	);
};

export default ProductsScreen;
