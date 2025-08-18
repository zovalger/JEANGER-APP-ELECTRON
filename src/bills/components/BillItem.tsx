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
import moneyFormat from "../../common/helpers/moneyFormat.helper";

interface BillItemSimplify extends Partial<IBillItem> {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
}

interface props {
	billId?: string;
	data: BillItemSimplify;
	onDeleteItem?(productId: string): void;
}

function BillItem({ billId, data, onDeleteItem }: props) {
	const { isCopy, copyToClipboard } = useClipboard();
	const { product } = useProduct({ productId: data.productId });
	const { getCostInBSAndCurrency } = useForeignExchange();
	const { billItemToText, setItem, removeItem } = useBill();

	const { IVAMode } = useBill();

	const { quantity, productId } = data;

	const [openContext, setOpenContext] = useState(false);
	const handdleOpenContext = () => setOpenContext(true);
	const handdleCloseContext = () => setOpenContext(false);

	const [openModal, setOpenModal] = useState(false);

	const handdleDelete = async () => {
		if (onDeleteItem) onDeleteItem(productId);
		await removeItem({
			billId,
			productId,
			updatedAt: new Date().toISOString(),
		});
	};

	// *******************************************************************
	// 													modal
	// *******************************************************************

	const [qu, setQu] = useState<string | number>(0);
	const [signo, setSigno] = useState<"+" | "-">("+");

	const handdleOpendiv = () => setOpenModal(true);
	const handdleCloseModal = () => {
		setQu(0);
		setOpenModal(false);
	};

	const haddleChange = (text: string) => {
		const n = text
			.replace(",", ".")
			.replace(/[^\d.]/g, "")
			.replace(/^0/, "");

		setQu(n);
	};

	const onSubmit = async () => {
		setQu(0);
		setSigno("+");
		await setItem({
			billId,
			productId,
			quantity: parseFloat(signo + qu),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
		handdleCloseModal();
		console.log("submit ");
	};

	if (!product) return <Text>loanding....</Text>;

	const { name, cost, currencyType } = product;

	const { BSF } = getCostInBSAndCurrency({ cost, currencyType });

	const costToView = IVAMode ? BSF / 1.16 : BSF;

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<div
				className={`  flex items-center mb-0.5 px-4 py-1 rounded   ${
					quantity ? "border" : ""
				} border-gray-500 hover:bg-gray-200 `}
				onClick={handdleOpendiv}
				onContextMenu={() => {
					handdleOpenContext();
				}}
			>
				<Text className="w-4 text-center">{moneyFormat(quantity, false)}</Text>

				<Text className="flex-1 ml-4">{name}</Text>

				<Text className="min-w-20 text-right">
					{moneyFormat(costToView)} {CurrencyType.BSF}
				</Text>

				<Text className="min-w-20 ml-4 text-right">
					{moneyFormat(costToView * quantity)} {CurrencyType.BSF}
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
						onClick={async () => {
							const text = await billItemToText({
								...data,
								productName: name,
								cost: BSF,
								currencyType: "bs",
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
							if (key === "Enter") {
								onSubmit();
							}
							if (key === "+" || key === "-") {
								setSigno(key);
							}
						}}
						value={qu}
						onChange={({ target: { value } }) => {
							console.log(value);

							haddleChange(value);
						}}
					/>

					<IconButton onClick={onSubmit} icon="Plus" />
				</div>
			</Modal>
		</>
	);
}

export default BillItem;
