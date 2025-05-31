import { useState } from "react";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import useBill from "../hooks/useBill";
import { IBillItem } from "../interfaces/bill.interface";
import { deleteItemInBill, updateBillItem } from "../helpers/Bill.helpers";
import { initialValuesForeignExchange } from "../../common/config/initialValues";
import { CurrencyType } from "../../common/enums";
import Modal from "../../common/components/Modal";
import Text from "../../common/components/Text";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";

interface props {
	data: IBillItem;
	onDeleteItem?(productId: string): void;
}

function BillItem({ data, onDeleteItem }: props) {
	const { currentBill, setCurrentBill } = useBill();
	const { foreignExchange } = useForeignExchange();
	const { getProduct } = useProduct();

	const { quantity, productId } = data;
	const { name, cost, currencyType } = getProduct(data.productId);

	const [opendiv, setOpendiv] = useState(false);

	const handdleOpendiv = () => {
		setOpendiv(true);
	};
	const handdleClosediv = () => {
		setOpendiv(false);
	};

	const handdleDelete = async () => {
		if (onDeleteItem) onDeleteItem(productId);
		setCurrentBill(deleteItemInBill(currentBill, foreignExchange, productId));
	};

	const d = foreignExchange || initialValuesForeignExchange;

	const divisaRef = currencyType === CurrencyType.USD ? d.dolar : d.euro;
	const BSF = currencyType === CurrencyType.BSF ? cost : cost * divisaRef;

	// *******************************************************************
	// 													modal
	// *******************************************************************

	const [qu, setQu] = useState(0);

	const onSubmit = () => {
		const newBill = updateBillItem(
			currentBill,
			{ ...data, quantity: qu },
			foreignExchange
		);
		setCurrentBill(newBill);
		handdleClosediv();
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<div
				onClick={() => {
					handdleOpendiv();
				}}
			>
				<div className="flex-row align-middle ">
					<div className="flex-row flex-1">
						<div className="min-w-8  mx-2 text-center ">{quantity}</div>
						<div>{name}</div>
					</div>

					<div className="flex-row justify-between flex-1">
						<div>
							<div>
								{BSF.toFixed(2)} {CurrencyType.BSF}
							</div>
						</div>
						<div>
							<div>
								{(BSF * quantity).toFixed(2)} {CurrencyType.BSF}
							</div>
						</div>
					</div>

					<div>
						<div
							onClick={() => {
								handdleDelete();
							}}
						>
							<div> x</div>
						</div>
					</div>
				</div>
			</div>

			{/* modal */}

			<Modal onClose={handdleClosediv} visible={opendiv}>
				<Text>Cantidad</Text>
				<Input
					autoFocus
					placeholder="Cantidad"
					onKeyDown={({ nativeEvent: { key } }) => {
						if (key === "Enter") onSubmit();
					}}
					value={qu.toString()}
					onChange={({ target: { value } }) => setQu(parseFloat(value))}
				/>

				<Button onClick={() => onSubmit()}>{">"}</Button>
			</Modal>
		</>
	);
}

export default BillItem;
