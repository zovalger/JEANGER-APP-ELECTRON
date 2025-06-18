import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";

import "./index.css";
import HomeScreen from "./auth/screens/HomeScreen";
import BillRoutes from "./bills/routes";
import DashboardLayout from "./common/Layouts/Dashboard.layout";
import StopwatchRoutes from "./stopwatch/routes";
import BackgroundProcessesLayout from "./common/Layouts/BackgroundProcesses.layout";

const root = createRoot(document.body);

const App = () => (
	<Routes>
		<Route path="/" index element={<HomeScreen />} />

		<Route element={<BackgroundProcessesLayout />}>
			<Route path="/dashboard" element={<DashboardLayout />}>
				{BillRoutes()}
				{StopwatchRoutes()}
			</Route>
		</Route>
	</Routes>
);

root.render(
	Object.keys(window).includes("electronAPI") ? (
		<HashRouter>
			<App />
		</HashRouter>
	) : (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
);
