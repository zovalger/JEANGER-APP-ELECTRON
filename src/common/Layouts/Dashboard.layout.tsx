import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import RouterLinks from "../config/RouterLinks";

interface DashboardLayoutProps {
	// Define any props if needed
	children?: React.ReactNode;
}

const DashboardLayout = (DashboardLayoutProps: DashboardLayoutProps) => {
	const { children } = DashboardLayoutProps;

	const [panelLeft, setfirst] = useState(true);

	return (
		<>
			<div className={`${panelLeft && "ml-48"}`}>{children || <Outlet />}</div>

			{panelLeft && (
				<div className="fixed top-0 left-0 w-48 h-full p-4 flex flex-col bg-white border-r">
					<Link to={RouterLinks.Bills}>Facturas</Link>
					{/* <Link to={RouterLinks.Products}>products</Link> */}
					{/* <Link to="/foreign-exchange">foreign exchange</Link> */}
				</div>
			)}

			<div>panel derecho</div>
		</>
	);
};

export default DashboardLayout;
