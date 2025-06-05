import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import RouterLinks from "../config/RouterLinks";
import IconButton from "../components/IconButton";
import Text from "../components/Text";
import useUI from "../hooks/useUI";
import ForeignExchangeView from "../components/ForeignExchangeView";
import Calculator from "../components/Calculator";

interface DashboardLayoutProps {
	// Define any props if needed
	children?: React.ReactNode;
}

const DashboardLayout = (DashboardLayoutProps: DashboardLayoutProps) => {
	const { children } = DashboardLayoutProps;
	const {
		leftPanelOpen,
		closeLeftPanel,
		rightPanelOpen,
		closeRightPanel,
		toogleRightPanel,
	} = useUI();

	const LeftPanel = () => (
		<div
			onClick={() => closeLeftPanel()}
			className={`fixed top-0 				${
				leftPanelOpen ? "translate-x-0" : "-translate-x-full"
			}
				bg-[#0005] w-screen h-full flex flex-col sm:w-48`}
		>
			<div
				className="bg-white h-full w-[80%] sm:w-full"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center py-4 mb-4">
					<IconButton
						className="mr-4 sm:hidden"
						icon="Close"
						onClick={() => closeLeftPanel()}
					/>
					<Text>Panel izquierdo</Text>
				</div>

				<Link to={RouterLinks.Bills} onClick={closeLeftPanel}>
					Facturas
				</Link>
			</div>
		</div>
	);

	const RightPanel = () => (
		<div
			className={`fixed top-0  w-screen h-full flex flex-col bg-white sm:w-60 sm:translate-x-0 ${
				rightPanelOpen ? "right-0" : "translate-x-full sm:-right-60"
			}`}
		>
			<div className="flex items-center justify-between pl-4 ">
				<Text>Panel derecho</Text>
				<IconButton icon="Close" onClick={() => closeRightPanel()} />
			</div>
			<div>
				<ForeignExchangeView />
				<Calculator />
			</div>
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

			<div className="fixed bottom-4 right-4">
				<IconButton icon="Tools" onClick={toogleRightPanel} />
			</div>

			<RightPanel />
		</>
	);
};

export default DashboardLayout;
