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
import moneyFormat from "../../common/helpers/moneyFormat.helper";

const BillScreen = () => {
	const { isCopy, copyToClipboard } = useClipboard();
	const { isCopy: isCopyBs, copyToClipboard: copyToClipboardBs } =
		useClipboard();
	const { products, getProductsFromServer } = useProduct();
	const { currentBill, clear_CurrentBill, billToText, IVAMode, toggleIVAMode } =
		useBill();

	useEffect(() => {
		getProductsFromServer()
			.then()
			.catch((err) => console.log(err));
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
					<IconButton icon="Refresh" onClick={getProductsFromServer} />
				</>
			}
		>
			{IVAMode && (
				<div className="absolute left-1/2 top-1/2 -translate-1/2 text-gray-500 text-9xl  -z-10 select-none">
					IVA
				</div>
			)}

			<BillProductSearch />

			{/* ******************************* visor ************************************ */}

			<div className="px-4 flex-1">
				{productsBillItemsFavoritesByPriority.map((data) => (
					<BillItem key={uuid()} data={data} onDeleteItem={onDeleteItem} />
				))}

				{currentBill &&
					remainingBillItem.map((item) => (
						<BillItem key={uuid()} data={item} />
					))}
			</div>

			<div className="m-4 flex flex-col sm:flex-row sm:justify-between gap-2">
				<div className="order-3 sm:order-1 sm:flex-1">
					<div className="flex flex-wrap ">
						<Button icon="Trash" variant="danger" onClick={onDelete}>
							Limpiar
						</Button>

						<Button
							icon={
								deletedFavorites.length === productsFavorites.length
									? "Eye"
									: "EyeOff"
							}
							onClick={() => {
								if (deletedFavorites.length === productsFavorites.length)
									return setDeletedFavorites([]);

								setDeletedFavorites(productsFavorites.map((item) => item._id));
							}}
						>
							Simplificar
						</Button>

						<Button variant="danger" onClick={() => toggleIVAMode()}>
							IVA
						</Button>

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

					<SavedBills />
				</div>

				<div className="order-2 sm:mr-16">
					{IVAMode && (
						<>
							<div className="flex justify-between items-center sm:justify-end">
								<Text className="mr-8">SubTotal</Text>
								<Text>
									{moneyFormat(totals.BSF / 1.16)} {CurrencyType.BSF}
								</Text>
							</div>

							<div className="flex justify-between items-center sm:justify-end">
								<Text className="mr-8">iva 16%</Text>

								<Text className="text-right">
									{moneyFormat(totals.BSF - totals.BSF / 1.16)}
									{CurrencyType.BSF}
								</Text>
							</div>
						</>
					)}
					<div className="flex justify-between items-center sm:justify-end ">
						<Text className="mr-8" size="big" variant="bold">
							Total
						</Text>
						<div className="flex flex-col ">
							<Text
								size="big"
								variant="bold"
								className={
									isCopyBs ? "text-right " : "cursor-pointer text-right"
								}
								onClick={() =>
									copyToClipboardBs(
										`${moneyFormat(totals.USD)} ${CurrencyType.USD}`
									)
								}
							>
								{moneyFormat(totals.USD)} {CurrencyType.USD}
							</Text>
							<Text
								size="big"
								variant="bold"
								className={
									isCopyBs ? "text-right " : "cursor-pointer text-right"
								}
								onClick={() =>
									copyToClipboardBs(`${moneyFormat(totals.BSF)} bs`)
								}
							>
								{moneyFormat(totals.BSF)} {CurrencyType.BSF}
							</Text>
						</div>
					</div>
				</div>
			</div>
		</PageTemplateLayout>
	);
};

export default BillScreen;
