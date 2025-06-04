import { ButtonHTMLAttributes } from "react";
import { Icons } from "../interfaces/icons";
import IconMap from "../icons";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: Icons;
	variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
	href?: string;
}

const IconButton = (props: IconButtonProps) => {
	const { className, onClick, icon, variant, href, ...otherPros } = props;

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
			className={` ${className}`}
		>
			<IconToShow />
		</button>
	);
};

export default IconButton;
