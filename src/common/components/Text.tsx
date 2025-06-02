import { ParamHTMLAttributes } from "react";

interface TextProps extends ParamHTMLAttributes<HTMLDivElement> {
	textType?: string;
}

const Text = (props: TextProps) => {
	const { className, ...otherPros } = props;

	return <div {...otherPros} className={`h-fit text-xs  ${className}`}></div>;
};

export default Text;
