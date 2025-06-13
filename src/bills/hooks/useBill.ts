import useBillStore from "../../common/store/useBillStore";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import {
	clearBill,
	deleteItemInBill,
	updateBillItem,
} from "../helpers/Bill.helpers";
import { IBill, IBillItem } from "../interfaces/bill.interface";

const useBill = (billId?: string) => {
	const { getProduct } = useProduct();
	const { foreignExchange } = useForeignExchange();

	const bills = useBillStore((state) => state.bills);
	const currentBill = useBillStore((state) => state.currentBill);
	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);

	const setCurrentBill = (bill: IBill) => onSetCurrentBill(bill);

	const addOrUpdateProduct_To_CurrentBill = async (
		productId: string,
		quantity?: number,
		options?: { setQuantity?: boolean }
	) => {
		try {
			const newItemBill: IBillItem = {
				productId,
				quantity: quantity ? quantity : 1,
				cost: getProduct(productId).cost,
				currencyType: getProduct(productId).currencyType,
			};

			const newBill = updateBillItem(
				currentBill,
				newItemBill,
				foreignExchange,
				options
			);

			setCurrentBill(newBill);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProduct_To_CurrentBill = (productId: string) => {
		const newBill = deleteItemInBill(currentBill, foreignExchange, productId);

		setCurrentBill(newBill);
	};

	const clear_CurrentBill = () => setCurrentBill(clearBill());

	return {
		bills,
		currentBill,
		setCurrentBill,
		addOrUpdateProduct_To_CurrentBill,
		deleteProduct_To_CurrentBill,
		clear_CurrentBill,
	};
};

export default useBill;
