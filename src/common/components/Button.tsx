import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { className, ...otherPros } = props;

	return <button {...otherPros} className={` ${className}`} />;
};

export default Button;
