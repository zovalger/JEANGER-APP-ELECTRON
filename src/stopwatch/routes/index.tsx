import { Route } from "react-router";
import StopwatchScreen from "../screens/StopwatchScreen";

const StopwatchRoutes = () => {
	return (
		<Route path="stopwatchs">
			<Route index element={<StopwatchScreen />} />
		</Route>
	);
};

export default StopwatchRoutes;
