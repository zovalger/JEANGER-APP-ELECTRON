import useBill from "../hooks/useBill";
import Text from "../../common/components/Text";
import SavedBillsItem from "./SavedBillsItem";

export default function SavedBills() {
	const { bills } = useBill();

	return (
		<>
			{/* <Divider sx={{ my: 3 }} /> */}

			<div>
				<div className="flex items-center justify-between ">
					<Text variant="bold">Facturas guardadas</Text>

					{/* <IconButton
						
						onClick={refreshBills}
					>
						<RefreshIcon />
					</IconButton> */}

					{/* <IconButton
						icon="Plus"
						size="small"
						onClick={() => {
							saveCurrentBill();
						}}
					/> */}
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
