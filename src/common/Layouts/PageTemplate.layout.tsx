import React from "react";
import IconButton from "../components/IconButton";
import { useLocation } from "react-router";
import Text from "../components/Text";
import RouterLinks from "../config/RouterLinks";
import useUI from "../hooks/useUI";

interface PageTemplateLayoutProps {
	children?: React.ReactNode;
	rightButtons?: React.ReactNode;
	name?: string;
	nameHelp?: string;
	backButtonURL?: string;
}

const PageTemplateLayout = (props: PageTemplateLayoutProps) => {
	const { openLeftPanel } = useUI();
	const { children, rightButtons, name, nameHelp, backButtonURL } = props;

	const router = useLocation();

	const nameTap = name || router.pathname.split("/").pop();

	return (
		<>
			<div className="sticky top-0 flex h-12 items-center bg-gray-100">
				{backButtonURL ? (
					<IconButton
						href={backButtonURL}
						className="mr-4"
						icon="ChevronDown"
					/>
				) : (
					<IconButton
						onClick={openLeftPanel}
						className="mr-4 sm:hidden"
						icon="Menu"
					/>
				)}

				<div className="absolute left-[50%] translate-x-[-50%] sm:static sm:translate-x-0 sm:ml-4">
					<Text>{nameTap}</Text>
					<Text>{nameHelp}</Text>
				</div>
				<div className="flex ml-auto">{rightButtons}</div>
			</div>

			{children}
		</>
	);
};

export default PageTemplateLayout;
