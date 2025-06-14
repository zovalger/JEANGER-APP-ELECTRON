import { v4 as uuid } from "uuid";
import SavedBillsItem from "./SavedBillsItem";
import useBill from "../hooks/useBill";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";

export default function SavedBills() {
	const { bills, saveCurrentBill } = useBill();

	return (
		<>
			{/* <Divider sx={{ my: 3 }} /> */}

			<div>
				<div>
					<Text>Facturas guardadas</Text>

					{/* <IconButton
						
						onClick={refreshBills}
					>
						<RefreshIcon />
					</IconButton> */}

					<IconButton
						icon="Plus"
						size="small"
						onClick={() => {
							saveCurrentBill();
						}}
					/>
				</div>

				<div>
					{bills.map((bill) => (
						<SavedBillsItem key={uuid()} data={bill} />
					))}
				</div>
			</div>
		</>
	);
}
