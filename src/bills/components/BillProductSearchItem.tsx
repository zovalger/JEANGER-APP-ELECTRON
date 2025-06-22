import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import useProduct from "../../products/hooks/useProduct";
import { CurrencyType } from "../../common/enums";
import Text from "../../common/components/Text";
import useClipboard from "../../common/hooks/useClipboard";
import IconButton from "../../common/components/IconButton";
import useBill from "../hooks/useBill";

interface props {
	_id: string;
	index: number;
	selected: number;
	onClick(n: number): void;
}

const BillProductSearchItem = (props: props) => {
	const { _id, index, selected, onClick } = props;

	const { billItemToText } = useBill();
	const { isCopy, copyToClipboard } = useClipboard();
	const { getCostInBSAndCurrency } = useForeignExchange();
	const { getProduct } = useProduct(_id);
	const { name, cost, currencyType } = getProduct(_id);

	const { BSF, divisaCost } = getCostInBSAndCurrency({
		cost,
		currencyType,
	});

	const colorCurrency =
		currencyType == CurrencyType.EUR ? "text-euro" : "text-dolar";

	return (
		<div
			className={`flex items-center gap-4 pr-4 py-1 hover:bg-gray-200 ${
				selected === index && "bg-gray-200"
			}`}
			key={_id}
			onClick={() => onClick(index)}
		>
			<IconButton
				icon={isCopy ? "ClipboardCheck" : "ClipboardCopy"}
				size="small"
				onClick={() => {
					const text = billItemToText({
						productName: name,
						quantity: 1,
						cost: BSF,
						currencyType: "bs",
					});
					copyToClipboard(text);
				}}
				tooltip="Copiar producto a mensaje"
			/>
			<Text className="flex-1">{name}</Text>

			<Text className="min-w-20 text-right">
				{Math.round(BSF)} {CurrencyType.BSF}
			</Text>

			<div className="min-w-20 flex gap-1">
				<Text>{divisaCost.toFixed(2)}</Text>
				<Text className={colorCurrency}>
					{currencyType == CurrencyType.EUR
						? CurrencyType.EUR
						: CurrencyType.USD}
				</Text>
			</div>
		</div>
	);
};

export default BillProductSearchItem;
