import React from "react";
import { Outlet } from "react-router";
import RouterLinks from "../config/RouterLinks";
import IconButton from "../components/IconButton";
import Text from "../components/Text";
import useUI from "../hooks/useUI";
import ForeignExchangeView from "../components/ForeignExchangeView";
import Calculator from "../components/Calculator";
import ConsultMovilnet from "../components/ConsultMovilnet";
import Button from "../components/Button";

interface DashboardLayoutProps {
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
			className={`fixed top-0  w-screen h-full flex flex-col bg-[#0003] sm:w-48 sm:translate-x-0				${
				leftPanelOpen ? "left-0" : "translate-x-full sm:-left-0"
			}
				`}
		>
			<div
				className="bg-white h-full w-[80%] sm:w-full shadow-sm"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex min-h-12 items-center justify-start sm:justify-start  bg-gray-100 ">
					<IconButton
						className="mr-4 sm:hidden"
						icon="Close"
						onClick={() => closeLeftPanel()}
					/>
					<Text size="big" variant="bold">
						JEANGER APP
					</Text>
				</div>
				<div className="h-full overflow-y-auto overflow-x-hidden">
					<Button
						textJustify="left"
						icon="ShoppingCart"
						href={RouterLinks.Bills}
						onClick={closeLeftPanel}
					>
						Facturas
					</Button>

					<Button
						textJustify="left"
						icon="Clock"
						href={RouterLinks.Stopwatchs}
						onClick={closeLeftPanel}
						className=""
					>
						Cronometros
					</Button>
				</div>
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
				<ConsultMovilnet />
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
