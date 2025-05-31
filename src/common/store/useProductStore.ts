import { create } from "zustand";
import { IProduct } from "../../products/interfaces/product.interface";
import products_testdata from "../../products/test_data/products_testdata";


interface IProductStore {
	products: IProduct[];
}

const useProductStore = create<IProductStore>((set) => ({
	products: products_testdata,
	removeAllProducts: () => set((state) => ({ ...state, products: [] })),
}));

export default useProductStore;
