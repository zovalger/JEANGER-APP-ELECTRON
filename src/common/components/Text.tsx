import { ParamHTMLAttributes } from "react";

const Text = (props: ParamHTMLAttributes<HTMLDivElement>) => {
	const { className, ...otherPros } = props;

	return <p {...otherPros} className={`h-fit ${className}`}></p>;
};

export default Text;
