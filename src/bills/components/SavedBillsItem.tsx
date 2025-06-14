import { IBill } from "../interfaces/bill.interface";
import useBill from "../hooks/useBill";
import useProduct from "../../products/hooks/useProduct";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";
// import moment from "moment";

interface props {
	data: IBill;
}

export default function SavedBillsItem({ data }: props) {
	const { name, totals, items, date, _id } = data;

	const { selectBill, removeBill } = useBill();
	const { getProduct } = useProduct();


	const handdleSelect = () => selectBill(_id);

	const handdleDelete = () => removeBill(_id);


	return (
		<div onClick={handdleSelect}>
			<div className="flex">
				<Text>{name || "Sin Nombre"}</Text>
				<Text className="mr-2 ml-auto">{totals.BSF?.toFixed(2) + " BSF"}</Text>

				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						handdleDelete();
					}}
					size="small"
					icon="Close"
					variant="danger"
				/>
			</div>

			<div>
				{items.map((item) => {
					const product = getProduct(item.productId);

					return (
						<Text key={item.productId}>
							{item.quantity}
							{product ? product.name : ". . ."}
						</Text>
					);
				})}
			</div>
		</div>
	);
}
