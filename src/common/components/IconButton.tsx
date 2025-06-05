import { ButtonHTMLAttributes } from "react";
import { Icons } from "../interfaces/icons";
import IconMap from "../icons";
import { ButtonVariants } from "../interfaces/ButtonVariants";
import { ButtonSizes } from "../interfaces/ButtonSizes";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: Icons;
	variant?: ButtonVariants;
	size?: ButtonSizes;
	href?: string;
}

const IconButton = (props: IconButtonProps) => {
	const {
		className,
		onClick,
		icon,
		variant,
		size = "normal",
		href,
		...otherPros
	} = props;

	const IconToShow = IconMap[icon]
		? IconMap[icon]
		: () => <span className="text-red-500">Icon not found</span>;

	if (href)
		return (
			<a href={href} className={` ${className}`}>
				<IconToShow />
			</a>
		);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...otherPros}
			className={`p-4 hover:bg-gray-100 ${className}`}
		>
			<IconToShow />
		</button>
	);
};

export default IconButton;
