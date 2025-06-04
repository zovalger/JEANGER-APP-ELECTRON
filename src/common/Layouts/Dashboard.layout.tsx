import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import RouterLinks from "../config/RouterLinks";
import IconButton from "../components/IconButton";
import Text from "../components/Text";
import useUI from "../hooks/useUI";

interface DashboardLayoutProps {
	// Define any props if needed
	children?: React.ReactNode;
}

const DashboardLayout = (DashboardLayoutProps: DashboardLayoutProps) => {
	const { children } = DashboardLayoutProps;
	const { leftPanelOpen, closeLeftPanel, rightPanelOpen, closeRightPanel } =
		useUI();

	const LeftPanel = () => (
		<div
			className={`fixed top-0 w-screen h-full flex flex-col bg-white sm:w-48 sm:translate-x-0 ${
				leftPanelOpen || "translate-x-full"
			}`}
		>
			<div className="flex items-center justify-between p-4 mb-4">
				<Text>Panel izquierdo</Text>
				<IconButton
					className="sm:hidden"
					icon="Close"
					onClick={() => closeLeftPanel()}
				/>
			</div>

			<Link to={RouterLinks.Bills}>Facturas</Link>
			{/* <Link to={RouterLinks.Bills}>Facturas</Link> */}
			{/* <Link to={RouterLinks.Products}>products</Link> */}
			{/* <Link to="/foreign-exchange">foreign exchange</Link> */}
		</div>
	);

	const RightPanel = () => (
		<div
			className={`fixed top-0  w-screen h-full flex flex-col bg-white sm:w-60 sm:translate-x-0 ${
				rightPanelOpen ? "right-0" : "translate-x-full sm:-right-60"
			}`}
		>
			<div className="flex items-center justify-between p-4 mb-4">
				<Text>Panel derecho</Text>
				<IconButton icon="Close" onClick={() => closeRightPanel()} />
			</div>
			<div>panel derecho</div>
		</div>
	);

	return (
		<>
			<div
				className={`max-h-screen overflow-y-auto sm:ml-48 ${
					rightPanelOpen && "sm:mr-60"
				}`}
			>
				{children || <Outlet />}
			</div>

			<LeftPanel />

			<RightPanel />
		</>
	);
};

export default DashboardLayout;
