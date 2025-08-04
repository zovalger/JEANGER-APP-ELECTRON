import useRequest from "../../common/hooks/useRequest";
import useProductStore from "../../common/store/useProductStore";
import { ProductUrls } from "../api/product-url";
import {
	CreateProductDto,
	CreateProductReferenceDto,
	UpdateProductDto,
	UpdateProductReferenceDto,
} from "../dto";
import { IProduct, IProductReference } from "../interfaces";

const useProduct = (productId?: string) => {
	const { jeangerApp_API } = useRequest();

	const products = useProductStore((state) => state.products);
	const currentReferences = useProductStore((state) => state.currentReferences);
	const productReferences = useProductStore((state) => state.productReferences);
	const productSettings = useProductStore((state) => state.productSettings);

	const onSetProducts = useProductStore((state) => state.onSetProducts);
	const onAddProduct = useProductStore((state) => state.onAddProduct);
	const onUpdateProduct = useProductStore((state) => state.onUpdateProduct);
	const onRemoveProduct = useProductStore((state) => state.onRemoveProduct);
	const onClearProducts = useProductStore((state) => state.onClearProducts);

	const onSetCurrentRefByChild = useProductStore(
		(state) => state.onSetCurrentRefByChild
	);
	const onClearCurrentRef = useProductStore((state) => state.onClearCurrentRef);
	const onSetProductRefs = useProductStore((state) => state.onSetProductRefs);
	const onAddProductRef = useProductStore((state) => state.onAddProductRef);
	const onUpdateProductRef = useProductStore(
		(state) => state.onUpdateProductRef
	);
	const onRemoveProductRef = useProductStore(
		(state) => state.onRemoveProductRef
	);

	const onSetProductsSettings = useProductStore(
		(state) => state.onSetProductsSettings
	);

	const createProduct = async (createProductDto: CreateProductDto) => {
		try {
			const { data } = await jeangerApp_API.post<IProduct>(
				ProductUrls.base(),
				createProductDto
			);

			onAddProduct(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductsFromServer = async () => {
		try {
			const { data } = await jeangerApp_API.get<IProduct[]>(ProductUrls.base());

			onSetProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProduct = (id: string) => {
		try {
			const p = products.find((item) => item._id === id);

			if (!p) throw new Error("Not Found");

			return p;
		} catch (error) {
			console.log(error);
		}
	};

	const updateProduct = async (
		id: string,
		updateProductDto: UpdateProductDto
	) => {
		try {
			const { data } = await jeangerApp_API.post<IProduct>(
				ProductUrls.byId(id),
				updateProductDto
			);

			onUpdateProduct(data);
		} catch (error) {
			console.log(error);
		}
	};

	const removeProduct = async (id: string) => {
		try {
			await jeangerApp_API.delete(ProductUrls.byId(id));

			onRemoveProduct(id);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductRefsFromServer = async () => {
		try {
			const { data } = await jeangerApp_API.get<IProductReference[]>(
				ProductUrls.references()
			);

			onSetProductRefs(data);
		} catch (error) {
			console.log(error);
		}
	};

	const createProductRef = async (
		createProductReferenceDto: CreateProductReferenceDto
	) => {
		try {
			const { data } = await jeangerApp_API.post<IProductReference>(
				ProductUrls.references(),
				createProductReferenceDto
			);

			onAddProductRef(data);
		} catch (error) {
			console.log(error);
		}
	};

	const updateProductRef = async (
		id: string,
		updateProductReferenceDto: UpdateProductReferenceDto
	) => {
		try {
			const { data } = await jeangerApp_API.post<IProductReference>(
				ProductUrls.referenceById(id),
				updateProductReferenceDto
			);

			onUpdateProductRef(data);
		} catch (error) {
			console.log(error);
		}
	};

	const removeProductRef = async (id: string) => {
		try {
			await jeangerApp_API.delete(ProductUrls.referenceById(id));

			onRemoveProductRef(id);
		} catch (error) {
			console.log(error);
		}
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
		productSettings,
		currentReferences,
		productReferences,

		getProductsFromServer,
		clearProducts: onClearProducts,

		getProduct,
		createProduct,
		updateProduct,
		removeProduct,

		getProductRefsFromServer,
		createProductRef,
		updateProductRef,
		removeProductRef,

		setCurrentRefByChild: onSetCurrentRefByChild,
		clearCurrentRef: onClearCurrentRef,

		// getProductSettings,
	};
};

export default useProduct;
