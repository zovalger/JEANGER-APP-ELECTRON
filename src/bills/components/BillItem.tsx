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
import IconButton from "../../common/components/IconButton";

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

	const [openModal, setOpenModal] = useState(false);

	const handdleOpendiv = () => setOpenModal(true);

	const handdleCloseModal = () => setOpenModal(false);

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
		handdleCloseModal();
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<div className="flex items-center p-4 " onClick={handdleOpendiv}>
				<Text className="w-4 text-center">{quantity}</Text>

				<Text className="flex-1 ml-4">{name}</Text>

				<Text className="min-w-20 text-right">
					{BSF.toFixed(2)} {CurrencyType.BSF}
				</Text>

				<Text className="min-w-20 text-right">
					{(BSF * quantity).toFixed(2)} {CurrencyType.BSF}
				</Text>

				<IconButton
					className="ml-4"
					variant="danger"
					onClick={handdleDelete}
					icon="Minus"
				/>
			</div>

			{/* modal */}

			<Modal onClose={handdleCloseModal} visible={openModal}>
				<div className="flex items-center justify-between mb-4">
					<Text>Cantidad</Text>
					<IconButton icon="Close" onClick={handdleCloseModal} />
				</div>

				<div className="flex items-center gap-2">
					<Input
						autoFocus
						placeholder="Cantidad"
						onKeyDown={({ nativeEvent: { key } }) => {
							if (key === "Enter") onSubmit();
						}}
						value={qu.toString()}
						onChange={({ target: { value } }) => setQu(parseFloat(value))}
					/>

					<IconButton onClick={onSubmit} icon="Plus" />
				</div>
			</Modal>
		</>
	);
}

export default BillItem;
