import { ParamHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import { TextVariants } from "../interfaces/TextVariants";

interface TextProps extends ParamHTMLAttributes<HTMLDivElement> {
	variant?: TextVariants;
	size?: UI_Sizes;
	selectable?: boolean;
}

const Text = (props: TextProps) => {
	const {
		variant = "normal",
		size = "normal",
		className,
		selectable = false,
		...otherPros
	} = props;

	const sizeClass =
		size === "tiny"
			? "text-[0.7rem]"
			: size === "small"
			? "text-xs"
			: size == "big"
			? "text-xl"
			: "text-sm";

	const weightClass =
		variant == "bold" ? "font-bold" : variant == "lighter" ? "font-light" : "";

	return (
		<div
			{...otherPros}
			className={`h-fit  ${
				selectable || "select-none"
			} ${weightClass} ${sizeClass} ${className}`}
		/>
	);
};

export default Text;
