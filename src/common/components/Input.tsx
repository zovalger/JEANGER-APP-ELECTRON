import { forwardRef, InputHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import Text from "./Text";

type InputVariants = "standar" | "without-border" | "border-bottom";

export interface CustomInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: UI_Sizes;
	inputVariant?: InputVariants;
	label?: string;
	helperText?: string;
	errorText?: string;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
	(props: CustomInputProps, ref) => {
		const {
			className,
			textSize,
			inputVariant = "standar",
			label,
			type = "text",
			helperText,
			errorText,
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

		const content = (
			<>
				<input
					step="any"
					ref={ref}
					{...otherPros}
					type={type}
					className={`w-full px-4 py-2  ${variantClass} ${sizeClass} ${className}`}
				/>

				<Text size="small" className="mb-2 min-h-4">
					{errorText || helperText}
				</Text>
			</>
		);

		return label ? (
			<label
				className={`flex w-full  ${
					type == "checkbox" || "flex-col "
				}  gap-1 ${className}`}
			>
				<Text variant="bold">{label}</Text>
				<div>{content}</div>
			</label>
		) : (
			content
		);
	}
);

export default Input;
