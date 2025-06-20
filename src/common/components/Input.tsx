import { forwardRef, InputHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";

type InputVariants = "standar" | "without-border" | "border-bottom";

export interface CustomInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: UI_Sizes;
	inputVariant?: InputVariants;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
	(props: CustomInputProps) => {
		const {
			className,
			textSize,
			inputVariant = "standar",
			...otherPros
		} = props;

		const sizeClass =
			textSize === "tiny"
				? "text-[0.7rem]"
				: textSize === "small"
				? "text-xs"
				: textSize == "big"
				? "text-xl"
				: "text-sm";

		const variantClass =
			inputVariant == "standar"
				? "border rounded"
				: inputVariant == "border-bottom"
				? "border-b"
				: "outline-none";

		return (
			<input
				{...otherPros}
				className={`w-full px-4 py-2  ${variantClass} ${sizeClass} ${className}`}
			/>
		);
	}
);

export default Input;
