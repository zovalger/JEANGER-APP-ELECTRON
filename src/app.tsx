import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import HomeScreen from "./auth/screens/HomeScreen";
import BillRoutes from "./bills/routes";
import DashboardLayout from "./common/Layouts/Dashboard.layout";
import StopwatchRoutes from "./stopwatch/routes";

const root = createRoot(document.body);

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" index element={<HomeScreen />} />

			<Route path="/dashboard" element={<DashboardLayout />}>
				{BillRoutes()}
				{StopwatchRoutes()}
			</Route>
		</Routes>
	</BrowserRouter>
);
