import { InputHTMLAttributes } from "react";
import { TextSizes } from "../interfaces/TextSizes";

interface props extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: TextSizes;
}

const Input = (props: props) => {
	const { className, textSize, ...otherPros } = props;

	return (
		<input {...otherPros} className={`w-full text-xs px-4 py-2 ${className}`} />
	);
};

export default Input;
