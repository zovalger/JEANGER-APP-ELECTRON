import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";
import { Toaster } from "react-hot-toast";

import "./index.css";
import BillRoutes from "./bills/routes";
import DashboardLayout from "./common/Layouts/Dashboard.layout";
import StopwatchRoutes from "./stopwatch/routes";
import BackgroundProcessesLayout from "./common/Layouts/BackgroundProcesses.layout";
import PublicRoutes from "./public/routes";
import AuthRoutes from "./auth/routes";
import ProductRoutes from "./products/routes";
import PhotoEditorRoutes from "./photo-editor/routes";

const root = createRoot(document.body);

const App = () => (
	<>
		<Routes>
			{PublicRoutes()}
			{AuthRoutes()}

			<Route element={<BackgroundProcessesLayout />}>
				<Route path="/dashboard" element={<DashboardLayout />}>
					{BillRoutes()}
					{PhotoEditorRoutes()}
					{StopwatchRoutes()}
					{ProductRoutes()}
				</Route>
			</Route>
		</Routes>

		<Toaster position="top-center" reverseOrder={false} />
	</>
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
