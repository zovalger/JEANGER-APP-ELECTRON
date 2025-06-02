import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import HomeScreen from "./auth/screens/HomeScreen";
import BillRoutes from "./bills/routes";
import DashboardLayout from "./common/Layouts/Dashboard.layout";

const root = createRoot(document.body);

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" index element={<HomeScreen />} />

			<Route path="/dashboard">
				<Route element={<DashboardLayout />}>{BillRoutes()}</Route>
			</Route>
		</Routes>
	</BrowserRouter>
);
