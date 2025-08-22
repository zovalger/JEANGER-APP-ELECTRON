import { Route } from "react-router";
import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";

const PublicRoutes = () => {
	return (
		<Route>
			<Route index element={<HomeScreen />} />
			<Route path="test" element={<TestScreen />} />
		</Route>
	);
};

export default PublicRoutes;
