import { ParamHTMLAttributes } from "react";

const Text = (props: ParamHTMLAttributes<HTMLDivElement>) => {
	const { className, ...otherPros } = props;

	return <div {...otherPros} className={` ${className}`}></div>;
};

export default Text;
