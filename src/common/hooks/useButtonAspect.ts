import { ButtonHTMLAttributes, JSX } from "react";
import { Icons } from "../interfaces/icons";
import { ButtonVariants } from "../interfaces/ButtonVariants";
import IconMap from "../icons";
import { UI_Sizes } from "../interfaces/UI_Sizes";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	typeButton: "normal" | "icon";
	icon?: Icons;
	variant?: ButtonVariants;
	size?: UI_Sizes;
	href?: string;
	textJustify?: "left" | "center" | "right";
	stopPropagation?: boolean;
	onClick?: (
		event:
			| React.MouseEvent<HTMLAnchorElement, MouseEvent>
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	tooltip?: string;
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
		textJustify = "center",
		stopPropagation = true,
		...otherPros
	} = props;

	const classOfTypeButton =
		typeButton == "normal"
			? `flex items-center ${
					textJustify === "center"
						? "justify-center"
						: textJustify === "left"
						? "justify-start"
						: "justify-end"
			  }`
			: "";

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
		stopPropagation,
		className: ` ${classOfTypeButton} ${color} ${sizeClass} ${className} `,
	};
};

export default useButtonAspect;
