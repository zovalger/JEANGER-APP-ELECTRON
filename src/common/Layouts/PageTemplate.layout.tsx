import React, { JSX } from "react";
import IconButton from "../components/IconButton";
import { useLocation } from "react-router";

interface PageTemplateLayoutProps {
	children?: React.ReactNode;
	rightButtons?: React.ReactNode;
	name?: string;
}

const PageTemplateLayout = (props: PageTemplateLayoutProps) => {
	const { children, rightButtons, name } = props;

	const router = useLocation();

	const nameTap = name || router.pathname.split("/").pop();

	return (
		<>
			<div className="sticky top-0 flex justify-between h-12 items-center bg-gray-200">
				<div className="flex">
					<IconButton icon="ChevronDown" />
					<div>{nameTap}</div>
				</div>
				<div className="flex">{rightButtons}</div>
			</div>

			{children}
		</>
	);
};

export default PageTemplateLayout;
