import React from "react";
import { Link } from "react-router";

interface DashboardLayoutProps {
	// Define any props if needed
	children?: React.ReactNode;
}

const DashboardLayout = (DashboardLayoutProps: DashboardLayoutProps) => {
	const { children } = DashboardLayoutProps;

	return (
		<div>
			<div>layout</div>
			<Link to="/">home</Link>

			{children}
		</div>
	);
};

export default DashboardLayout;
