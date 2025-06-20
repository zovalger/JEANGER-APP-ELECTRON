import { useState } from "react";

import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import useBill from "../hooks/useBill";
import { IBillItem } from "../interfaces/bill.interface";
import { CurrencyType } from "../../common/enums";
import Modal from "../../common/components/Modal";
import Text from "../../common/components/Text";
import Input from "../../common/components/Input";
import IconButton from "../../common/components/IconButton";
import Button from "../../common/components/Button";
import useClipboard from "../../common/hooks/useClipboard";

interface props {
	data: IBillItem;
	onDeleteItem?(productId: string): void;
}

function BillItem({ data, onDeleteItem }: props) {
	const { isCopy, copyToClipboard } = useClipboard();
	const { billItemToText } = useBill();
	const { getCostInBSAndCurrency } = useForeignExchange();
	const { getProduct } = useProduct();

	const { addOrUpdateProduct_To_CurrentBill, deleteProduct_To_CurrentBill } =
		useBill();

	const { quantity, productId } = data;
	const { name, cost, currencyType } = getProduct(data.productId);

	const [openContext, setOpenContext] = useState(false);
	const handdleOpenContext = () => setOpenContext(true);
	const handdleCloseContext = () => setOpenContext(false);

	const [openModal, setOpenModal] = useState(false);
	const handdleOpendiv = () => setOpenModal(true);
	const handdleCloseModal = () => setOpenModal(false);

	const handdleDelete = async () => {
		if (onDeleteItem) onDeleteItem(productId);
		deleteProduct_To_CurrentBill(productId);
	};

	const { BSF } = getCostInBSAndCurrency({ cost, currencyType });

	// *******************************************************************
	// 													modal
	// *******************************************************************

	const [qu, setQu] = useState(0);
	const [signo, setSigno] = useState<"+" | "-">("+");

	const haddleChange = (text: string) => {
		const n = parseFloat(signo + text.replace(/[-+]/gi, ""));
		setQu(isNaN(n) ? 0 : n);
	};

	const onSubmit = () => {
		addOrUpdateProduct_To_CurrentBill(data.productId, qu);
		handdleCloseModal();
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<div
				className="flex items-center mb-0.5 px-4 py-1 rounded border border-gray-500 hover:bg-gray-200 "
				onClick={handdleOpendiv}
				onContextMenu={() => {
					handdleOpenContext();
				}}
			>
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
					icon="Trash"
					size="small"
				/>
			</div>
			{openContext && (
				<div className="flex p-2">
					<Button
						icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
						size="small"
						onClick={() => {
							const text = billItemToText({
								...data,
								productName: name,
								cost: BSF,
								currencyType: CurrencyType.BSF,
							});

							copyToClipboard(text);
							handdleCloseContext();
						}}
					>
						Copiar
					</Button>
				</div>
			)}

			{/* modal */}

			<Modal onClose={handdleCloseModal} visible={openModal}>
				<div className="flex items-center justify-between mb-4">
					<Text>Cantidad</Text>
					<IconButton icon="Close" onClick={handdleCloseModal} />
				</div>

				<div className="flex items-center gap-2">
					<Input
						autoFocus
						className={`${
							signo === "-" ? "outline-red-500" : "outline-lime-500"
						}`}
						placeholder="Cantidad"
						onKeyDown={({ nativeEvent: { key } }) => {
							if (key === "Enter") onSubmit();
							if (key === "+" || key === "-") setSigno(key);
						}}
						value={qu.toString()}
						onChange={({ target: { value } }) => haddleChange(value)}
					/>

					<IconButton onClick={onSubmit} icon="Plus" />
				</div>
			</Modal>
		</>
	);
}

export default BillItem;
