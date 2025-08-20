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
import { Icons } from "../interfaces/icons";
import useUser from "../../auth/hooks/useUser";
import { useSocketContext } from "../context/Socket.context";

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

const ModulesApp: {
	icon: Icons;
	href: string;
	text: string;
}[] = [
	{ icon: "ShoppingCart", href: RouterLinks.Bills, text: "Facturas" },
	{ icon: "Clock", href: RouterLinks.Stopwatchs, text: "Cronometros" },
	{ icon: "Package", href: RouterLinks.Products, text: "Productos" },
];

const DashboardLayout = (DashboardLayoutProps: DashboardLayoutProps) => {
	const { children } = DashboardLayoutProps;
	const { isConnected, createNewConnection } = useSocketContext();
	const {
		leftPanelOpen,
		closeLeftPanel,
		rightPanelOpen,
		closeRightPanel,
		toogleRightPanel,
	} = useUI();
	const { logout, userLogged } = useUser();

	const LeftPanel = () => (
		<div
			onClick={() => closeLeftPanel()}
			className={`absolute top-0  w-screen h-full flex flex-col bg-[#0003] sm:w-12 lg:w-48 sm:translate-x-0				${
				leftPanelOpen ? "left-0" : "translate-x-full sm:-left-0"
			}
				`}
		>
			<div
				className="flex flex-col flex-1 w-[80%] sm:w-full border-r bg-white border-gray-500"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex min-h-14 items-center justify-start sm:justify-center  bg-gray-100 ">
					<IconButton
						className="mr-4 sm:hidden"
						icon="Close"
						onClick={() => closeLeftPanel()}
					/>
					<Text size="big" variant="bold" className="block sm:hidden lg:block">
						JEANGER APP
					</Text>
				</div>

				<div className="flex-1 overflow-y-auto overflow-x-hidden">
					{ModulesApp.map((item) => (
						<div key={item.text}>
							<Button
								textJustify="left"
								icon={item.icon}
								href={item.href}
								onClick={closeLeftPanel}
								className="sm:hidden lg:flex"
							>
								{item.text}
							</Button>
							<IconButton
								textJustify="left"
								icon={item.icon}
								href={item.href}
								onClick={closeLeftPanel}
								className="hidden sm:block lg:hidden"
							/>
						</div>
					))}
				</div>
				{userLogged && (
					<div className="flex items-center justify-between border-t border-gray-500">
						<Text className="block sm:hidden lg:block ml-4">
							{userLogged.name}
						</Text>
						<IconButton className="" icon="Close" onClick={() => logout()} />
					</div>
				)}
			</div>
		</div>
	);

	const RightPanel = () => (
		<div
			className={`absolute top-0 w-screen h-full flex flex-col overflow-y-visible bg-white sm:w-60 sm:translate-x-0 border-l border-gray-500  ${
				rightPanelOpen ? "right-0" : "translate-x-full sm:-right-60"
			}`}
		>
			<div className="flex-1 overflow-y-auto pb-16">
				<ForeignExchangeView />
				<Calculator />
				<ConsultMovilnet />
			</div>

			<div className="absolute bottom-0 left-0 right-0 flex items-center justify-end pl-4 bg-[#fff1] backdrop-blur-sm ">
				<IconButton icon="Close" onClick={() => closeRightPanel()} />
			</div>
		</div>
	);

	return (
		<>
			<div className="relative flex-1 overflow-hidden">
				<div
					className={`flex flex-col h-full overflow-y-auto sm:ml-12 lg:ml-48 ${
						rightPanelOpen && "sm:mr-60"
					}`}
				>
					{children || <Outlet />}
				</div>

				<div className="absolute bottom-2 right-2">
					<IconButton icon="Tools" onClick={toogleRightPanel} />
				</div>

				<LeftPanel />

				<RightPanel />
			</div>
			{!isConnected && (
				<div className="bg-red-300 px-4 flex justify-center items-center">
					<Text>Sin Conexión</Text>
					<Button
						className="ml-4"
						icon="Refresh"
						size="tiny"
						onClick={() => createNewConnection()}
					>
						Reconectar
					</Button>
				</div>
			)}
		</>
	);
};

export default DashboardLayout;
