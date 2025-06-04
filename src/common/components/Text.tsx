import { ParamHTMLAttributes } from "react";
import { TextSizes } from "../interfaces/TextSizes";
import { TextVariants } from "../interfaces/TextVariants";

interface TextProps extends ParamHTMLAttributes<HTMLDivElement> {
	variant?: TextVariants;
	size?: TextSizes;
}

const Text = (props: TextProps) => {
	const {
		variant = "normal",
		size = "normal",
		className,
		...otherPros
	} = props;

	return <div {...otherPros} className={`h-fit text-xs  ${className}`}></div>;
};

export default Text;
