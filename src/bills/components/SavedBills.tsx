import useBill from "../hooks/useBill";
import Text from "../../common/components/Text";
import SavedBillsItem from "./SavedBillsItem";
import IconButton from "../../common/components/IconButton";

export default function SavedBills() {
	const { bills, getAllBills } = useBill();

	return (
		<>
			{/* <Divider sx={{ my: 3 }} /> */}

			<div>
				<div className="flex items-center ">
					<Text variant="bold">Facturas guardadas</Text>
					<IconButton onClick={getAllBills} icon="Refresh" size="small" />
				</div>

				<div className="flex flex-wrap gap-2">
					{bills.map((bill) => (
						<SavedBillsItem key={bill.tempId} data={bill} />
					))}
				</div>
			</div>
		</>
	);
}
