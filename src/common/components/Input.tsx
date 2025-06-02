import { InputHTMLAttributes } from "react";


// interface props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	const { className, ...otherPros } = props;

	return <input {...otherPros} className={`w-full text-xs px-4 py-2 ${className}`} />;
};

export default Input;
