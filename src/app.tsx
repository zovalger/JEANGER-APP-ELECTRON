import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";

import "./index.css";
import BillRoutes from "./bills/routes";
import DashboardLayout from "./common/Layouts/Dashboard.layout";
import StopwatchRoutes from "./stopwatch/routes";
import BackgroundProcessesLayout from "./common/Layouts/BackgroundProcesses.layout";
import PublicRoutes from "./public/routes";
import AuthRoutes from "./auth/routes";
import ProductRoutes from "./products/routes";

const root = createRoot(document.body);

const App = () => (
	<Routes>
		{PublicRoutes()}
		{AuthRoutes()}

		<Route element={<BackgroundProcessesLayout />}>
			<Route path="/dashboard" element={<DashboardLayout />}>
				{BillRoutes()}
				{StopwatchRoutes()}
				{ProductRoutes()}
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
