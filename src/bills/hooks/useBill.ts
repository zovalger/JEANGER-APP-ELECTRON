import useBillStore from "../../common/store/useBillStore";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import { updateBillItem } from "../helpers/Bill.helpers";
import { IBill, IBillItem } from "../interfaces/bill.interface";

const useBill = (billId?: string) => {
	const { getProduct } = useProduct();
	const { foreignExchange } = useForeignExchange();

	const bills = useBillStore((state) => state.bills);
	const currentBill = useBillStore((state) => state.currentBill);
	const onSetCurrentBill = useBillStore((state) => state.onSetCurrentBill);

	const setCurrentBill = (bill: IBill) => onSetCurrentBill(bill);

	const addProductToBill = async (productId: string, quantity?: number) => {
		try {
			const newItemBill: IBillItem = {
				productId,
				quantity: quantity ? quantity : 1,
				cost: getProduct(productId).cost,
				currencyType: getProduct(productId).currencyType,
			};

			const newBill = updateBillItem(currentBill, newItemBill, foreignExchange);

			setCurrentBill(newBill);
		} catch (error) {
			console.log(error);
		}
	};

	return { bills, currentBill, setCurrentBill, addProductToBill };
};

export default useBill;
