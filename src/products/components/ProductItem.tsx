import { useState } from "react";

import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { CurrencyType } from "../../common/enums";
import Modal from "../../common/components/Modal";
import Text from "../../common/components/Text";
import moneyFormat from "../../common/helpers/moneyFormat.helper";
import { IProduct } from "../interfaces/product.interface";
import ProductForm from "./ProductForm";

interface props {
	data: IProduct;
}

function ProductItem({ data }: props) {
	const { getCostInBSAndCurrency } = useForeignExchange();

	const { name, cost, currencyType } = data;
	const { BSF, divisaCost } = getCostInBSAndCurrency({
		cost,
		currencyType,
	});

	const colorCurrency =
		currencyType == CurrencyType.EUR ? "text-euro" : "text-dolar";

	const [openModal, setOpenModal] = useState(false);
	const handdleOpendiv = () => setOpenModal(true);
	const handdleCloseModal = () => setOpenModal(false);

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			<div
				className={`flex items-center gap-4 pr-4 py-2 hover:bg-gray-200 `}
				onClick={handdleOpendiv}
			>
				<Text className="flex-1 ml-4">{name}</Text>

				<Text className="min-w-20 text-right">
					{moneyFormat(BSF)} {CurrencyType.BSF}
				</Text>

				<div className="min-w-20 flex gap-1 justify-end">
					<Text>{moneyFormat(divisaCost)}</Text>
					<Text className={colorCurrency}>
						{currencyType == CurrencyType.EUR
							? CurrencyType.EUR
							: CurrencyType.USD}
					</Text>
				</div>
			</div>

			{/* modal */}
			<Modal onClose={handdleCloseModal} visible={openModal}>
				<ProductForm initialData={data} successCallback={handdleCloseModal} />
			</Modal>
		</>
	);
}

export default ProductItem;
