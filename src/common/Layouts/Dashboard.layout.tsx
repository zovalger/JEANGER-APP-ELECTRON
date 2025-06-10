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
			className={`fixed top-0  w-screen h-full flex flex-col bg-white sm:w-48 sm:translate-x-0				${
				leftPanelOpen ? "left-0" : "translate-x-full sm:-left-0"
			}
				`}
		>
			<div
				className="bg-white h-full w-[80%] sm:w-full"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center mb-4">
					<IconButton
						className="mr-4 sm:hidden"
						icon="Close"
						onClick={() => closeLeftPanel()}
					/>
					<Text>Panel izquierdo</Text>
				</div>

				<Link to={RouterLinks.Bills} onClick={closeLeftPanel}>
					<Text>Facturas</Text>
				</Link>
				<Link to={RouterLinks.Stopwatchs} onClick={closeLeftPanel}>
					<Text>cronometros</Text>
				</Link>
			</div>
		</div>
	);

	const RightPanel = () => (
		<div
			className={`fixed top-0 w-screen h-full flex flex-col bg-white sm:w-60 sm:translate-x-0 ${
				rightPanelOpen ? "right-0" : "translate-x-full sm:-right-60"
			}`}
		>
			<div className="flex items-center justify-between pl-4 ">
				<Text>Panel derecho</Text>
			</div>
			<div className="flex-1 overflow-y-auto">
				<ForeignExchangeView />
				<Calculator />
			</div>

			<div className="flex items-center justify-end pl-4 ">
				<IconButton icon="Close" onClick={() => closeRightPanel()} />
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

			<div className="fixed bottom-0 right-0">
				<IconButton icon="Tools" onClick={toogleRightPanel} />
			</div>

			<LeftPanel />

			<RightPanel />
		</>
	);
};

export default DashboardLayout;
