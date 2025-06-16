import { forwardRef, InputHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";

export interface CustomInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: UI_Sizes;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
	(props: CustomInputProps) => {
		const { className, textSize, ...otherPros } = props;

		const sizeClass =
			textSize === "tiny"
				? "text-[0.7rem]"
				: textSize === "small"
				? "text-xs"
				: textSize == "big"
				? "text-xl"
				: "text-sm";

		return (
			<input
				{...otherPros}
				className={`w-full px-4 py-2 ${sizeClass} ${className}`}
			/>
		);
	}
);

export default Input;
