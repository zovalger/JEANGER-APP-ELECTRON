import { ParamHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import { TextVariants } from "../interfaces/TextVariants";

interface TextProps extends ParamHTMLAttributes<HTMLDivElement> {
	variant?: TextVariants;
	size?: UI_Sizes;
	selectable?: boolean;
	inlineBlock?: boolean;
}

const Text = (props: TextProps) => {
	const {
		variant = "normal",
		size = "normal",
		className,
		selectable = false,
		inlineBlock = false,
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

	const displayClass = inlineBlock ? "inline-block mx-0.5" : "block";

	return (
		<div
			{...otherPros}
			className={`h-fit   ${
				selectable || "select-none"
			} ${displayClass} ${weightClass} ${sizeClass} ${className}`}
		/>
	);
};

export default Text;
