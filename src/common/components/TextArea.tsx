import { forwardRef, TextareaHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import Text from "./Text";

type TextAreaVariants = "standar" | "without-border" | "border-bottom";

export interface CustomTextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	textSize?: UI_Sizes;
	textAreaVariant?: TextAreaVariants;
	label?: string;
	helperText?: string;
	errorText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
	(props: CustomTextAreaProps, ref) => {
		const {
			className,
			textSize,
			textAreaVariant = "standar",
			label,
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
			textAreaVariant == "standar"
				? "border rounded"
				: textAreaVariant == "border-bottom"
				? "border-b"
				: "outline-none";

		const content = (
			<>
				<textarea
					ref={ref}
					rows={5}
					{...otherPros}
					className={`w-full px-4 py-2  ${variantClass} ${sizeClass} ${className}`}
				></textarea>
				<Text size="small" className="mb-2 min-h-4">
					{errorText || helperText}
				</Text>
			</>
		);

		return label ? (
			<label className={`flex flex-col gap-1 ${className}`}>
				<Text variant="bold">{label}</Text>
				<div>{content}</div>
			</label>
		) : (
			content
		);
	}
);

export default TextArea;
