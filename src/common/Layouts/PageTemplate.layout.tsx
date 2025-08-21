import React from "react";
import IconButton from "../components/IconButton";
import { useLocation } from "react-router";
import Text from "../components/Text";
import useUI from "../hooks/useUI";
import useUser from "../../auth/hooks/useUser";

interface PageTemplateLayoutProps {
	children?: React.ReactNode;
	rightButtons?: React.ReactNode;
	name?: string;
	nameHelp?: string;
	backButtonURL?: string;
}

const PageTemplateLayout = (props: PageTemplateLayoutProps) => {
	const { userLogged } = useUser();
	const { openLeftPanel } = useUI();
	const { children, rightButtons, name, nameHelp, backButtonURL } = props;

	const router = useLocation();

	const nameTap = name || router.pathname.split("/").pop();

	const right =
		rightButtons instanceof Array
			? rightButtons.map((item, index) => ({ ...item, key: index }))
			: rightButtons;

	return (
		<>
			<div className="pb-16 flex flex-col order-2 flex-1">{children}</div>
			<div
				style={{ backgroundColor: userLogged?.identityColor || "#E5E7EB" }}
				className={`sticky top-0 order-1 flex min-h-14 items-center`}
			>
				{backButtonURL ? (
					<IconButton
						href={backButtonURL}
						className="mr-4"
						icon="ChevronLeft"
					/>
				) : (
					<IconButton
						onClick={openLeftPanel}
						className="mr-4 sm:hidden"
						icon="Menu"
					/>
				)}

				<div className="flex flex-col items-center sm:items-start absolute left-[50%] translate-x-[-50%] sm:static sm:translate-x-0 sm:ml-4">
					<Text>{nameTap}</Text>
					<Text size="tiny">{nameHelp}</Text>
				</div>
				<div className="flex ml-auto">{right}</div>
			</div>
		</>
	);
};

export default PageTemplateLayout;
