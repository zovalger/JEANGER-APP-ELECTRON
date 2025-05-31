import useProductStore from "../../common/store/useProductStore";

const useProduct = (productId?: string) => {
	const products = useProductStore((state) => state.products);

	const getProduct = (id: string) => {
		const p = products.find((item) => item._id === id);

		if (!p) throw new Error("Not Found");
		
		return p;
	};
	return { products, getProduct };
};

export default useProduct;
