import useRequest from "../../common/hooks/useRequest";
import useProductStore from "../../common/store/useProductStore";
import { ProductUrls } from "../api/product-url";
import { IProduct } from "../interfaces/product.interface";

const useProduct = (productId?: string) => {
	const products = useProductStore((state) => state.products);
	const onSetProducts = useProductStore((state) => state.onSetProducts);
	const productSettings = useProductStore((state) => state.productSettings);
	const onSetProductsSettings = useProductStore(
		(state) => state.onSetProductsSettings
	);

	const { jeangerApp_API } = useRequest();

	// export const getIProductRequest = async (id: string): Promise<IProduct> =>
	// 	(await jeangerApp_API.get(`${url}/${id}`)).data;

	// export const getAllIProductsRequest = async (): Promise<IProduct[]> =>
	// 	(await jeangerApp_API.get(`${url}`)).data;

	// // ***************** modificaciones	*****************

	// export const createIProductRequest = async (data: IProduct): Promise<IProduct> =>
	// 	(await jeangerApp_API.post(url, data)).data;

	// export const updateIProductRequest = async (
	// 	id: string,
	// 	data: IProduct
	// ): Promise<IProduct> => (await jeangerApp_API.put(`${url}/${id}`, data)).data;

	// export const deleteIProductRequest = async (id: string): Promise<boolean> =>
	// 	(await jeangerApp_API.delete(`${url}/${id}`)).data;

	const getAllProductsWithServer = async () => {
		try {
			const { data } = await jeangerApp_API.get<IProduct[]>(
				ProductUrls.base()
			);

			onSetProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProduct = (id: string) => {
		const p = products.find((item) => item._id === id);

		if (!p) throw new Error("Not Found");

		return p;
	};

	// const getProductSettings = async () => {
	// 	try {
	// 		const s = await getProductSettingRequest();

	// 		onSetProductsSettings(s);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return {
		products,
		getProduct,
		getAllProductsWithServer,
		productSettings,
		// getProductSettings,
	};
};

export default useProduct;
