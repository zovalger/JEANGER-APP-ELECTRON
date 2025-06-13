import React, { ButtonHTMLAttributes, JSX } from "react";
import { Icons } from "../interfaces/icons";
import { ButtonVariants } from "../interfaces/ButtonVariants";
import { ButtonSizes } from "../interfaces/ButtonSizes";
import IconMap from "../icons";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	typeButton: "normal" | "icon";
	icon?: Icons;
	variant?: ButtonVariants;
	size?: ButtonSizes;
	href?: string;
}

interface ButtonPropsToReturn extends Omit<ButtonProps, "typeButton"> {
	IconComponent?: () => JSX.Element | null;
}

const useButtonAspect = (props: ButtonProps): ButtonPropsToReturn => {
	const {
		typeButton,
		className,
		variant,
		size = "normal",
		disabled,
		icon,
		...otherPros
	} = props;

	const classOfTypeButton =
		typeButton == "normal" ? "flex justify-center items-center" : "";

	const sizeClass =
		size === "small"
			? "p-2"
			: size === "big"
			? "p-6"
			: size === "tiny"
			? "p-1"
			: "p-4";

	const color = disabled
		? "text-gray-500"
		: "hover:bg-gray-200 active:bg-gray-400";

	const IconToShow = icon
		? IconMap[icon]
			? IconMap[icon]
			: IconMap.icon_not_found
		: null;

	return {
		...otherPros,
		variant,
		size,
		disabled,
		IconComponent: IconToShow,
		className: `  ${classOfTypeButton} ${color} ${sizeClass} ${className} `,
	};
};

export default useButtonAspect;
