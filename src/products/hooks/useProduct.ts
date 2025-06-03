import useProductStore from "../../common/store/useProductStore";
import { getAllIProductsRequest } from "../api/Product.api";

const useProduct = (productId?: string) => {
	const products = useProductStore((state) => state.products);
	const setProducts = useProductStore((state) => state.setProducts);

	const getProduct = (id: string) => {
		const p = products.find((item) => item._id === id);

		if (!p) throw new Error("Not Found");

		return p;
	};

	const getAllProductsWithServer = async () => {
		try {
			const data = await getAllIProductsRequest();

			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	return { products, getProduct, getAllProductsWithServer };
};

export default useProduct;
