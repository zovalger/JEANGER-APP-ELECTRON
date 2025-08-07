import { useEffect, useState } from "react";
import { CurrencyType } from "../../common/enums";
import useRequest from "../../common/hooks/useRequest";
import useProductStore from "../../common/store/useProductStore";
import { ProductUrls } from "../api/product-url";
import {
	CreateProductDto,
	CreateProductReferenceDto,
	PosibleParentDto,
	UpdateProductDto,
	UpdateProductReferenceDto,
} from "../dto";
import { IProduct, IProductReference } from "../interfaces";

interface Options {
	productId?: string;
	childId?: string;
}

const useProduct = (options?: Options) => {
	const { jeangerApp_API } = useRequest();
	const [first, setFirst] = useState(true);

	const [product, setProduct] = useState<IProduct | null>(null);
	const products = useProductStore((state) => state.products);
	const currentReferences = useProductStore((state) => state.currentReferences);
	const productReferences = useProductStore((state) => state.productReferences);
	const productSettings = useProductStore((state) => state.productSettings);

	const onSetProducts = useProductStore((state) => state.onSetProducts);
	const onAddProduct = useProductStore((state) => state.onAddProduct);
	const onUpdateProduct = useProductStore((state) => state.onUpdateProduct);
	const onRemoveProduct = useProductStore((state) => state.onRemoveProduct);
	const onClearProducts = useProductStore((state) => state.onClearProducts);

	const onSetCurrentRef = useProductStore((state) => state.onSetCurrentRef);
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

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getProductsFromServer = async () => {
		try {
			const { data } = await jeangerApp_API.get<IProduct[]>(ProductUrls.base());

			onSetProducts(data);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getProduct = async (id: string) => {
		try {
			const p = products.find((item) => item._id === id);

			if (!p) throw new Error("Not Found");

			return p;
		} catch (error) {
			console.log(error);
			throw new Error("producto no encontrado");
		}
	};

	const updateProduct = async (
		id: string,
		updateProductDto: UpdateProductDto
	) => {
		try {
			const { data } = await jeangerApp_API.patch<IProduct>(
				ProductUrls.byId(id),
				updateProductDto
			);

			onUpdateProduct(data);
			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const removeProduct = async (id: string) => {
		try {
			await jeangerApp_API.delete(ProductUrls.byId(id));

			onRemoveProduct(id);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
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
			throw new Error(error.message);
		}
	};

	const getParentRefs = async (childId: string) => {
		try {
			const { data } = await jeangerApp_API.get<IProductReference[]>(
				ProductUrls.references(),
				{ params: { childId } }
			);
			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getPosibleParents = async (childId: string) => {
		try {
			const { data } = await jeangerApp_API.get<PosibleParentDto[]>(
				ProductUrls.posibleParents(childId)
			);

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
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
			throw new Error(error.message);
		}
	};

	const updateProductRef = async (
		id: string,
		updateProductReferenceDto: UpdateProductReferenceDto
	) => {
		try {
			const { data } = await jeangerApp_API.patch<IProductReference>(
				ProductUrls.referenceById(id),
				updateProductReferenceDto
			);

			onUpdateProductRef(data);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const removeProductRef = async (id: string) => {
		try {
			await jeangerApp_API.delete(ProductUrls.referenceById(id));

			onRemoveProductRef(id);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
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

	useEffect(() => {
		if (!first) return;
		setFirst(false);

		if (!options) return;

		if (options.childId)
			try {
				getParentRefs(options.childId).then((refs) => onSetCurrentRef(refs));
			} catch (error) {
				console.log(error);
			}

		if (options.productId) {
			try {
				getProduct(options.productId).then((item) => setProduct(item));
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return {
		product,
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

		getPosibleParents,
		getParentRefs,
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
