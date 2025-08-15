import { useEffect, useRef, useState } from "react";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductItem from "../components/ProductItem";
import IconButton from "../../common/components/IconButton";
import RouterLinks from "../../common/config/RouterLinks";
import Input from "../../common/components/Input";
import { IProduct } from "../interfaces";

const ProductsScreen = () => {
	const { products, getProductsFromServer, filterByName } = useProduct();

	const [time, setTime] = useState<NodeJS.Timeout | null>();
	const [toSee, setToSee] = useState<IProduct[]>(products);
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);
	const onChange = (value: string) => setInputValue(value);

	const onClear = () => {
		setInputValue("");
	};

	useEffect(() => {
		getProductsFromServer()
			.then()
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (time) clearTimeout(time);

		setTime(
			setTimeout(
				() => filterByName(inputValue, products).then((data) => setToSee(data)),
				500
			)
		);
	}, [inputValue]);

	return (
		<PageTemplateLayout
			name="Productos"
			nameHelp="Todos los productos creados"
			rightButtons={[
				<IconButton icon="Plus" href={RouterLinks.NewProduct} />,
				<IconButton icon="Refresh" onClick={getProductsFromServer} />,
				<IconButton icon="Gear" href={RouterLinks.ProductSettings} />,
			]}
		>
			<div className="sticky top-14 p-4 backdrop-blur-sm bg-[#fff9]">
				<div className="">
					<Input
						placeholder="Buscar producto"
						className="w-full"
						ref={inputRef}
						value={inputValue}
						onChange={({ target: { value } }) => onChange(value)}
						onKeyDown={({ nativeEvent: { key } }) => {
							if (key === "Escape") onClear();
							// if (key === "ArrowUp") moveSelected(-1);
							// if (key === "ArrowDown") moveSelected(1);
							// if (key === "Enter") onEnter();
						}}
					/>
				</div>
			</div>

			<div className="flex flex-col flex-wrap gap-2">
				{toSee.map((item) => (
					<ProductItem key={item._id} data={item} />
				))}
			</div>
		</PageTemplateLayout>
	);
};

export default ProductsScreen;
