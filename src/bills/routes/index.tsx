import { Route } from "react-router";
import BillScreen from "../screens/BillScreen";

const BillRoutes = () => {
	return (
		<Route path="bills">
			<Route index element={<BillScreen />} />
		</Route>
	);
};

export default BillRoutes;
