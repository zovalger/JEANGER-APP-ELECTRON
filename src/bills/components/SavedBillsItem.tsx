import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import moneyFormat from "../../common/helpers/moneyFormat.helper";
import useBill from "../hooks/useBill";
import { IBill } from "../interfaces";

interface props {
	data: IBill;
}

export default function SavedBillsItem({ data }: props) {
	const { name, totals, tempId, _id } = data;

	const { currentBill, selectBill, removeBill } = useBill();

	const handdleSelect = async () => await selectBill(tempId);

	const handdleDelete = async () =>
		await removeBill({
			_id: tempId,
			updatedAt: new Date().toISOString(),
		});

	return (
		<div
			onClick={handdleSelect}
			className={`flex gap-2 py-0 pl-2 rounded border  ${
				currentBill && currentBill.tempId == tempId
					? "border-cyan-400"
					: "border-dashed"
			} `}
		>
			<div className="">
				<Text>{name || "Sin Nombre"}</Text>

				<div className="flex gap-2">
					<Text className="mr-2 text-right">
						{totals && moneyFormat(totals.BSF) + "bs"}
					</Text>
				</div>
			</div>

			<IconButton
				onClick={async (e) => {
					e.stopPropagation();
					await handdleDelete();
				}}
				size="tiny"
				icon="Trash"
				variant="danger"
			/>
		</div>
	);
}
