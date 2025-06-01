import { ButtonHTMLAttributes } from "react";
import { Icons } from "../interfaces/icons";
import IconMap from "../icons";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: Icons;
	variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
}

const IconButton = (props: IconButtonProps) => {
	const { className, icon, variant, ...otherPros } = props;

	const IconToShow = IconMap[icon]
		? IconMap[icon]
		: () => <span className="text-red-500">Icon not found</span>;

	return (
		<button {...otherPros} className={` ${className}`}>
			<IconToShow />
		</button>
	);
};

export default IconButton;
