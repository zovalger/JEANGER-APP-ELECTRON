import { InputHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";

interface props extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: UI_Sizes;
}

const Input = (props: props) => {
	const { className, textSize, ...otherPros } = props;

	return (
		<input {...otherPros} className={`w-full text-xs px-4 py-2 ${className}`} />
	);
};

export default Input;
