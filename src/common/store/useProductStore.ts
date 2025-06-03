import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "../../products/interfaces/product.interface";

interface IProductStore {
	products: IProduct[];
	setProducts: (products: IProduct[]) => void;
	removeAllProducts: () => void;
}

const useProductStore = create<IProductStore>()(
	persist<IProductStore>(
		(set) => ({
			products: [],

			setProducts: (products: IProduct[]) => {
				set((state) => ({ ...state, products }));
			},

			removeAllProducts: () => set((state) => ({ ...state, products: [] })),
		}),
		{ name: "product-store" }
	)
);

export default useProductStore;
