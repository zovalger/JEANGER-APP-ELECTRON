import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import BillItem from "../components/BillItem";
import useBill from "../hooks/useBill";
import useProduct from "../../products/hooks/useProduct";
import {
	getOnlyFavoriteProduct,
	sortProductByPriority,
} from "../../products/helpers/Product.helpers";
import { initialValuesBill } from "../../common/config/initialValues";
import { CurrencyType } from "../../common/enums";
import Text from "../../common/components/Text";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import IconButton from "../../common/components/IconButton";
import SavedBills from "../components/SavedBills";
import Button from "../../common/components/Button";
import BillProductSearch from "../components/BillProductSearch";
import useClipboard from "../../common/hooks/useClipboard";

const BillScreen = () => {
	const { isCopy, copyToClipboard } = useClipboard();
	const { products, getAllProductsWithServer } = useProduct();
	const { currentBill, clear_CurrentBill, billToText } = useBill();

	useEffect(() => {
		getAllProductsWithServer();
	}, []);

	// *******************************************************************
	// 													Visor
	// *******************************************************************

	const [deletedFavorites, setDeletedFavorites] = useState<string[]>([]);

	const { totals, items } = currentBill || initialValuesBill;

	const sortByPriority = sortProductByPriority(products);

	const productsFavorites = getOnlyFavoriteProduct(sortByPriority);

	const productsBillItemsFavoritesByPriority = productsFavorites
		.map((prod) => {
			const { _id, currencyType, cost } = prod;

			const billItem = items.find((item) => item.productId === _id);

			return billItem || { productId: _id, quantity: 0, currencyType, cost };
		})
		.filter((item) => !deletedFavorites.includes(item.productId));

	const remainingBillItem = items.filter(
		(prod) =>
			!productsBillItemsFavoritesByPriority.some(
				(item) => item.productId === prod.productId
			)
	);

	useEffect(() => {
		if (!currentBill) return;

		const toRemoveFromDeleted = deletedFavorites.filter((id) =>
			currentBill.items.some((item) => item.productId == id)
		);

		setDeletedFavorites((prev) =>
			prev.filter((_id) => !toRemoveFromDeleted.includes(_id))
		);
	}, [currentBill]);

	const onDelete = async () => {
		setDeletedFavorites([]);
		clear_CurrentBill();
	};

	// *******************************************************************
	// 													items
	// *******************************************************************

	const onDeleteItem = (productId: string) => {
		// todo: añadir al array de favoritos eliminados
		if (deletedFavorites.includes(productId)) return;
		setDeletedFavorites((prev) => [...prev, productId]);
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<PageTemplateLayout
			rightButtons={
				<>
					<IconButton icon="Refresh" onClick={onDelete} />
				</>
			}
		>
			<BillProductSearch />

			{/* ******************************* visor ************************************ */}

			<div className="px-4">
				{/* // todo: que no se desordenen al agregarlos a la factura  */}
				{productsBillItemsFavoritesByPriority.map((data) => (
					<BillItem key={uuid()} data={data} onDeleteItem={onDeleteItem} />
				))}

				{currentBill &&
					remainingBillItem.map((item) => (
						<BillItem key={uuid()} data={item} />
					))}

				<div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
					<div className="flex flex-wrap order-3 sm:order-1 sm:flex-1 sm:mr-16">
						<Button icon="Trash" variant="danger" onClick={onDelete}>
							Limpiar
						</Button>
						<Button icon="ClipboardCopy">Simplificar</Button>
						<Button icon="ClipboardCopy">IVA</Button>
						<Button
							icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
							onClick={() => {
								const text = billToText(currentBill);
								copyToClipboard(text);
							}}
						>
							Copiar
						</Button>
					</div>
					<div className="order-2 sm:mr-16">
						{/* <div className="flex justify-between items-center sm:justify-end">
						<Text className="mr-8">SubTotal</Text>
						<Text>
							{(totals.BSF * (1 / 1.16)).toFixed(2)} {CurrencyType.BSF}
						</Text>
					</div>

					<div className="flex justify-between items-center sm:justify-end">
						<Text className="mr-8">iva 16%</Text>

						<Text className="text-right">
							{(totals.BSF - totals.BSF * (1 / 1.16)).toFixed(2)}
							{CurrencyType.BSF}
						</Text>
					</div> */}
						<div className="flex justify-between items-center sm:justify-end ">
							<Text className="mr-8" size="big" variant="bold">
								Total
							</Text>
							<div className="flex flex-col ">
								<Text size="big" variant="bold" className="text-right ">
									{totals.USD.toFixed(2)} {CurrencyType.USD}
								</Text>
								<Text size="big" variant="bold" className="text-right">
									{totals.BSF.toFixed(2)} {CurrencyType.BSF}
								</Text>
							</div>
						</div>
					</div>
				</div>
			</div>

			<SavedBills />
		</PageTemplateLayout>
	);
};

export default BillScreen;
