import { IBill } from "../interfaces/bill.interface";
import useBill from "../hooks/useBill";
import useProduct from "../../products/hooks/useProduct";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";
import moneyFormat from "../../common/helpers/moneyFormat.helper";
// import moment from "moment";

interface props {
	data: IBill;
}

export default function SavedBillsItem({ data }: props) {
	const { name, totals, items, date, _id } = data;

	const { currentBill, selectBill, removeBill } = useBill();
	const { getProduct } = useProduct();

	const handdleSelect = () => selectBill(_id);

	const handdleDelete = () => removeBill(_id);

	return (
		<div
			onClick={handdleSelect}
			className={`flex gap-2 py-0 pl-2 rounded border  ${
				currentBill._id === _id ? "border-cyan-400" : "border-dashed"
			} `}
		>
			<div className="">
				<Text>{name || "Sin Nombre"}</Text>

				<div className="flex gap-2">
					<div className="flex flex-1 items-center gap-1">
						{/* <div className="size-3 rounded-4xl bg-blue-500"></div>
						<div className="size-3 rounded-4xl bg-blue-500"></div>
						<div className="size-3 rounded-4xl bg-blue-500"></div> */}
					</div>

					<Text className="mr-2 text-right">
						{moneyFormat(totals.BSF) + "bs"}
					</Text>
				</div>
			</div>

			{/* <IconButton
				onClick={(e) => {
					e.stopPropagation();
					handdleDelete();
				}}
				size="tiny"
				icon="Edit"
				variant="danger"
			/> */}

			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					handdleDelete();
				}}
				size="tiny"
				icon="Close"
				variant="danger"
			/>
		</div>
	);
}
