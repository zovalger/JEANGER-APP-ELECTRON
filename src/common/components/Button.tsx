import { ButtonHTMLAttributes } from "react";
import { Icons } from "../interfaces/icons";
import IconMap from "../icons";
import { ButtonVariants } from "../interfaces/ButtonVariants";
import { ButtonSizes } from "../interfaces/ButtonSizes";
import Text from "./Text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: Icons;
	variant?: ButtonVariants;
	size?: ButtonSizes;
	href?: string;
}
const Button = (props: ButtonProps) => {
	const {
		className,
		onClick,
		icon,
		variant,
		size = "normal",
		href,
		children,
		...otherPros
	} = props;

	const sizeClass =
		size === "small"
			? "p-2"
			: size === "big"
			? "p-6"
			: size === "tiny"
			? "p-1"
			: "p-4";

	const IconToShow = IconMap[icon]
		? IconMap[icon]
		: () => icon && <span className="text-red-500">Icon not found</span>;

	if (href)
		return (
			<a
				href={href}
				className={`flex justify-center items-center ${className}`}
			>
				<IconToShow /> <Text>{children}</Text>
			</a>
		);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...otherPros}
			className={`hover:bg-gray-200 flex justify-center items-center ${sizeClass} ${className}`}
		>
			<IconToShow /> <Text>{children}</Text>
		</button>
	);
};

export default Button;
