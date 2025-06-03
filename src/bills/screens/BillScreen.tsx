import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import BillItem from "../components/BillItem";
import { clearBill, updateBillItem } from "../helpers/Bill.helpers";
import useBill from "../hooks/useBill";
import { IBillItem } from "../interfaces/bill.interface";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import {
	getOnlyFavoriteProduct,
	searchProductsByWord,
	sortProductByPriority,
} from "../../products/helpers/Product.helpers";
import {
	initialValuesBill,
	initialValuesForeignExchange,
} from "../../common/config/initialValues";
import Input from "../../common/components/Input";
import { CurrencyType } from "../../common/enums";
import Text from "../../common/components/Text";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Button from "../../common/components/Button";
import IconButton from "../../common/components/IconButton";

const regExpAdder = /^(\+|-)\d{1,}/i;

const BillScreen = () => {
	const { foreignExchange } = useForeignExchange();
	const { products, getProduct, getAllProductsWithServer } = useProduct();
	const { currentBill, setCurrentBill } = useBill();

	const [inputValue, setInputValue] = useState("");
	const [adderValue, setAdderValue] = useState<null | number>(null);
	const [productList, setProductList] = useState<string[]>([]);
	const [selected, setSelected] = useState<number>(-1);

	useEffect(() => {
		getAllProductsWithServer();
	}, []);

	// *******************************************************************
	// 													Fuctions
	// *******************************************************************

	const refreshShowList = (search: string) => {
		if (search.length < 2) {
			setProductList([]);
			setSelected(-1);
			return;
		}

		const resultSearch = searchProductsByWord(search, products);

		const productsIds = sortProductByPriority(resultSearch).map(
			(product) => product._id
		);

		setProductList(productsIds);
	};

	useEffect(() => {
		refreshShowList(inputValue);
	}, [inputValue]);

	const addProductToBill = (productId: string, quantity?: number) => {
		const newItemBill: IBillItem = {
			productId,
			quantity: quantity ? quantity : adderValue ? adderValue : 1,
			cost: getProduct(productId).cost,
			currencyType: getProduct(productId).currencyType,
		};

		const newBill = updateBillItem(currentBill, newItemBill, foreignExchange);

		setCurrentBill(newBill);
	};

	// *******************************************************************
	// 													controls
	// *******************************************************************

	const onChange = (value: string) => setInputValue(value);

	const moveSelected = (direction: number) => {
		const brutePos = selected + direction;

		const newPos =
			brutePos < 0
				? productList.length - 1
				: brutePos >= productList.length
				? 0
				: brutePos;

		setSelected(newPos);
	};

	const moveSelectedToPos = (index: number) => {
		setSelected(index);
	};

	const onEnter = (position?: number) => {
		const matching = inputValue.match(regExpAdder);

		let newInputText = inputValue;
		let quantity = adderValue || 1;

		if (matching) {
			quantity = parseInt(matching[0]);
			newInputText = inputValue.trim().replace(regExpAdder, "");
		}

		if (selected > -1 || position !== undefined) {
			const productId =
				productList[position !== undefined ? position : selected];
			addProductToBill(productId, quantity);

			quantity = 0;
			newInputText = "";
		}

		//todo: añadir a la lista

		setAdderValue(quantity || null);
		setInputValue(newInputText);
		setSelected(-1);
	};

	const onClear = () => {
		setInputValue("");
		setAdderValue(null);
		setSelected(-1);
	};

	// *******************************************************************
	// 													Selector
	// *******************************************************************

	const showLimitedProducts = (arr: string[]) => {
		const limited = arr.slice(0, 15);

		return limited.map((_id, index) => {
			// <BillProductItem
			// 	key={_id}
			// 	_id={_id}
			// 	index={index}
			// 	selected={selected}
			// 	onClick={() => {
			// 		onEnter(index);
			// 	}}

			const { name, cost, currencyType } = getProduct(_id);

			const d = foreignExchange || initialValuesForeignExchange;

			const divisaRef =
				currencyType == CurrencyType.BSF || currencyType == CurrencyType.USD
					? d.dolar
					: d.euro;

			// costo bolivares
			const BSF = currencyType == CurrencyType.BSF ? cost : cost * divisaRef;

			// costo en divisa
			const divisaCost =
				currencyType == CurrencyType.BSF ? cost / divisaRef : cost;

			return (
				<div
					className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
						selected === index && "bg-gray-200"
					}`}
					key={_id}
					onClick={() => onEnter(index)}
				>
					<Text className="flex-1">{name}</Text>

					<Text className="min-w-20 text-right">
						{Math.round(BSF)} {CurrencyType.BSF}
					</Text>

					<Text className="min-w-20 text-right">
						{divisaCost.toFixed(2)}{" "}
						{currencyType == CurrencyType.EUR
							? CurrencyType.EUR
							: CurrencyType.USD}
					</Text>
				</div>
			);
		});
	};

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

	// *******************************************************************
	// 													Functions
	// *******************************************************************

	const [submiting, setSubmiting] = useState(false);

	const opendiv = () => {
		if (!currentBill || !currentBill.items.length) return;
		setSubmiting(true);
	};

	const closediv = () => {
		setSubmiting(false);
	};

	const onDelete = async () => {
		setDeletedFavorites([]);
		setCurrentBill(clearBill());
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
	// 													BillProductVisorItem
	// *******************************************************************

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<PageTemplateLayout
			rightButtons={<IconButton icon="Refresh" onClick={onDelete} />}
		>
			<div className="sticky top-14 my-2">
				<div className="px-4 ">
					<Input
						className="bg-gray-100 rounded-xl "
						placeholder="Buscar"
						value={inputValue}
						onChange={({ target: { value } }) => onChange(value)}
						onKeyDown={({ nativeEvent: { key } }) => {
							if (key === "Escape") onClear();
							if (key === "ArrowUp") moveSelected(-1);
							if (key === "ArrowDown") moveSelected(1);
							if (key === "Enter") onEnter();
						}}
					/>
				</div>

				{/* ******************************* Selector del buscador ************************************ */}

				{productList.length > 0 && (
					<div className="absolute z-10 left-0 right-0 bg-white rounded-lg shadow-lg p-2">
						{showLimitedProducts(productList)}
					</div>
				)}
			</div>

			{/* ******************************* visor ************************************ */}

			<div>
				{/* // todo: que no se desordenen al agregarlos a la factura  */}
				{productsBillItemsFavoritesByPriority.map((data) => (
					<BillItem key={uuid()} data={data} onDeleteItem={onDeleteItem} />
				))}

				{currentBill &&
					remainingBillItem.map((item) => (
						<BillItem key={uuid()} data={item} />
					))}

				{/* <Button
								onClick={() => {
									onDelete();
								}}
							>
								Eliminar
							</Button>

							<Button onClick={() => opendiv()}>añadir</Button> */}

				<div className="mx-12	">
					<div className="flex justify-between items-center">
						<Text>SubTotal</Text>
						<Text>
							{(totals.BSF * (1 / 1.16)).toFixed(2)} {CurrencyType.BSF}
						</Text>
					</div>

					<div className="flex justify-between items-center">
						<Text>iva 16%</Text>

						<Text className="text-right">
							{(totals.BSF - totals.BSF * (1 / 1.16)).toFixed(2)}{" "}
							{CurrencyType.BSF}
						</Text>
					</div>
					<div className="flex justify-between items-center">
						<Text>Total</Text>
						<div className="flex flex-col">
							<Text className="text-right">
								{totals.USD.toFixed(2)} {CurrencyType.USD}
							</Text>
							<Text className="text-right">
								{totals.BSF.toFixed(2)} {CurrencyType.BSF}
							</Text>
						</div>
					</div>
				</div>
			</div>
		</PageTemplateLayout>
	);
};

export default BillScreen;
