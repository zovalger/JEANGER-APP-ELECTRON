import { Route } from "react-router";
import LoginScreen from "../screens/LoginScreen";

const AuthRoutes = () => {
	return (
		<Route path="auth">
			<Route path="login" element={<LoginScreen />} />
		</Route>
	);
};

export default AuthRoutes;
