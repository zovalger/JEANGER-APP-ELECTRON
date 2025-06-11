import useProductStore from "../../common/store/useProductStore";
import { getAllIProductsRequest } from "../api/Product.api";
import { getProductSettingRequest } from "../api/ProductSettings.api";

const useProduct = (productId?: string) => {
	const products = useProductStore((state) => state.products);
	const onSetProducts = useProductStore((state) => state.onSetProducts);
	const productSettings = useProductStore((state) => state.productSettings);
	const onSetProductsSettings = useProductStore(
		(state) => state.onSetProductsSettings
	);

	const getProduct = (id: string) => {
		const p = products.find((item) => item._id === id);

		if (!p) throw new Error("Not Found");

		return p;
	};

	const getAllProductsWithServer = async () => {
		try {
			const data = await getAllIProductsRequest();

			onSetProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductSettings = async () => {
		try {
			const s = await getProductSettingRequest();

			onSetProductsSettings(s);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		products,
		getProduct,
		getAllProductsWithServer,
		productSettings,
		getProductSettings,
	};
};

export default useProduct;
