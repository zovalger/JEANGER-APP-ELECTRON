import { forwardRef, TextareaHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import Text from "./Text";

type TextAreaVariants = "standar" | "without-border" | "border-bottom";

export interface CustomTextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	textSize?: UI_Sizes;
	textAreaVariant?: TextAreaVariants;
	label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
	(props: CustomTextAreaProps, ref) => {
		const {
			className,
			textSize,
			textAreaVariant = "standar",
			label,
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
			<textarea
				ref={ref}
				rows={5}
				{...otherPros}
				className={`w-full px-4 py-2  ${variantClass} ${sizeClass} ${className}`}
			></textarea>
		);

		return label ? (
			<label className={`flex justify-between flex-col gap-1 my-2`}>
				<Text>{label}</Text>
				<div>{content}</div>
			</label>
		) : (
			content
		);
	}
);

export default TextArea;
