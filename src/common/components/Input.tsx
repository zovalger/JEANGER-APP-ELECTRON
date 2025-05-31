import { InputHTMLAttributes } from "react";


// interface props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	const { className, ...otherPros } = props;

	return <input {...otherPros} className={` ${className}`} />;
};

export default Input;
