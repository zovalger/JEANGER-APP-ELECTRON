import { Route } from "react-router";
import HomeScreen from "../screens/HomeScreen";

const PublicRoutes = () => {
	return (
		<Route>
			<Route index element={<HomeScreen />} />
		</Route>
	);
};

export default PublicRoutes;
