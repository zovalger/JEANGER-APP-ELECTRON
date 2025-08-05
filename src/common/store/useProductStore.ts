import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	IProduct,
	IProductReference,
	IProductSetting,
} from "../../products/interfaces";

interface IProductState {
	products: IProduct[];
	productSettings: IProductSetting | null;

	currentReferences: IProductReference[] | null;
	productReferences: IProductReference[];

	// todo: anadir solucion para modo offline
}

interface IProductActions {
	onSetProducts: (products: IProduct[]) => void;
	onAddProduct: (product: IProduct) => void;
	onUpdateProduct: (products: IProduct) => void;
	onRemoveProduct: (id: string) => void;
	onClearProducts: () => void;

	onSetProductsSettings: (products: IProductSetting) => void;

	onSetCurrentRef: (productRefs: IProductReference[]) => void;
	onSetCurrentRefByChild: (childId: string) => void;
	onClearCurrentRef: () => void;

	onSetProductRefs: (products: IProductReference[]) => void;
	onAddProductRef: (product: IProductReference) => void;
	onUpdateProductRef: (products: IProductReference) => void;
	onRemoveProductRef: (id: string) => void;
}

interface IProductStore extends IProductState, IProductActions {}

const useProductStore = create<IProductStore>()(
	persist<IProductStore>(
		(set) => ({
			products: [],
			productSettings: null,
			currentReferences: null,
			productReferences: [],

			onSetProducts: (products: IProduct[]) => {
				set((state) => ({ ...state, products }));
			},

			onAddProduct: (product) =>
				set((state) => ({ ...state, products: [...state.products, product] })),

			onUpdateProduct: (product) =>
				set((state) => ({
					...state,
					products: state.products.map((item) =>
						item._id == product._id ? product : item
					),
				})),

			onRemoveProduct: (id) =>
				set((state) => ({
					...state,
					products: state.products.filter((item) => item._id !== id),
				})),

			onClearProducts: () => set((state) => ({ ...state, products: [] })),

			onSetProductsSettings: (productSettings: IProductSetting) => {
				set((state) => ({ ...state, productSettings }));
			},

			onSetCurrentRefByChild: (childId) =>
				set((state) => ({
					...state,
					currentReferences: state.productReferences.filter(
						(item) => item.childId === childId
					),
				})),

			onSetCurrentRef: (productRefs) =>
				set((state) => ({
					...state,
					currentReferences: productRefs,
				})),

			onClearCurrentRef: () =>
				set((state) => ({ ...state, currentReferences: [] })),

			onSetProductRefs: (productReferences) =>
				set((state) => ({ ...state, productReferences })),

			onAddProductRef: (productReference) =>
				set((state) => ({
					...state,
					productReferences: [...state.productReferences, productReference],
				})),

			onUpdateProductRef: (productReference) =>
				set((state) => ({
					...state,
					productReferences: state.productReferences.map((item) =>
						item._id == productReference._id ? productReference : item
					),
				})),

			onRemoveProductRef: (id) =>
				set((state) => ({
					...state,
					productReferences: state.productReferences.filter(
						(item) => item._id !== id
					),
					currentReferences: state.currentReferences.filter(
						(item) => item._id !== id
					),
				})),
		}),
		{ name: "product-store" }
	)
);

export default useProductStore;
