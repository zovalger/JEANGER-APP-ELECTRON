import { ParamHTMLAttributes } from "react";
import { TextSizes } from "../interfaces/TextSizes";
import { TextVariants } from "../interfaces/TextVariants";

interface TextProps extends ParamHTMLAttributes<HTMLDivElement> {
	variant?: TextVariants;
	size?: TextSizes;
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

	return (
		<div
			{...otherPros}
			className={`h-fit text-xs ${selectable || "select-none"}  ${className}`}
		></div>
	);
};

export default Text;
