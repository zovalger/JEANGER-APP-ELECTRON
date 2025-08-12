import { useEffect, useRef, useState } from "react";
import Input, { CustomInputProps } from "../../common/components/Input";
import useBill from "../hooks/useBill";
import {
	searchProductsByWord,
	sortProductByPriority,
} from "../../products/helpers/Product.helpers";
import useProduct from "../../products/hooks/useProduct";
import BillProductSearchItem from "./BillProductSearchItem";

const regExpAdder = /^(\+|-)\d{1,}/i;

interface props {
	billId?: string;
}

const BillProductSearch = (props: props) => {
	const { billId } = props;

	const { setItem } = useBill();
	const { products } = useProduct();

	const [inputValue, setInputValue] = useState("");
	const [productList, setProductList] = useState<string[]>([]);
	const [selected, setSelected] = useState<number>(-1);

	const inputRef = useRef<HTMLInputElement | null>(null);

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

	const onEnter = async (position?: number) => {
		const matching = inputValue.match(regExpAdder);

		let newInputText = inputValue;
		let quantity = 1;

		if (matching) {
			quantity = parseInt(matching[0]);
			newInputText = inputValue.trim().replace(regExpAdder, "");
		}

		if (selected > -1 || position !== undefined) {
			const productId =
				productList[position !== undefined ? position : selected];

			await setItem({
				billId,
				productId,
				quantity,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			
			quantity = 0;
			newInputText = "";
		}

		setInputValue(newInputText);
		setSelected(-1);
	};

	const onClear = () => {
		setInputValue("");
		setSelected(-1);
	};

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

	useEffect(() => {
		const focusInput = (e: KeyboardEvent) => {
			if (e.key === "F6" && inputRef.current) inputRef.current.focus();
		};

		document.addEventListener("keydown", focusInput);

		return () => document.removeEventListener("keydown", focusInput);
	}, []);

	// *******************************************************************
	// 													Selector
	// *******************************************************************

	const showLimitedProducts = (arr: string[]) => {
		const limited = arr.slice(0, 15);

		return limited.map((id, index) => (
			<BillProductSearchItem
				key={id}
				_id={id}
				index={index}
				onClick={onEnter}
				selected={selected}
			/>
		));
	};

	return (
		<div className="sticky top-14 p-4 backdrop-blur-sm bg-[#fff9]">
			<div className="">
				<Input
					ref={inputRef}
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

			{productList.length > 0 && (
				<div className="absolute -translate-y-4 z-10 left-4 right-4 bg-white rounded shadow-2xl outline">
					{showLimitedProducts(productList)}
				</div>
			)}
		</div>
	);
};

export default BillProductSearch;
