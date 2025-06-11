import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "../../products/interfaces/product.interface";
import { IProductSettings } from "../../products/interfaces/product_settings.interface";

interface IProductState {
	products: IProduct[];
	productSettings: IProductSettings | null;
}

interface IProductActions {
	onSetProducts: (products: IProduct[]) => void;
	onSetProductsSettings: (products: IProductSettings) => void;
	onRemoveAllProducts: () => void;
}

interface IProductStore extends IProductState, IProductActions {}

const useProductStore = create<IProductStore>()(
	persist<IProductStore>(
		(set) => ({
			products: [],
			productSettings: null,
			onSetProducts: (products: IProduct[]) => {
				set((state) => ({ ...state, products }));
			},

			onSetProductsSettings: (productSettings: IProductSettings) => {
				set((state) => ({ ...state, productSettings }));
			},

			onRemoveAllProducts: () => set((state) => ({ ...state, products: [] })),
		}),
		{ name: "product-store" }
	)
);

export default useProductStore;
