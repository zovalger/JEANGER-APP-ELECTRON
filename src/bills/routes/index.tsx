import { Route } from "react-router";
import BillScreen from "../screens/BillScreen";

const BillRoutes = () => {
	return (
		<Route path="bill">
			<Route index element={<BillScreen />} />
		</Route>
	);
};

export default BillRoutes;
