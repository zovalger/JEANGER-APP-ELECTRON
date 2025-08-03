import { forwardRef, SelectHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import Text from "./Text";

type SelectVariants = "standar" | "without-border" | "border-bottom";

export interface CustomSelectProps
	extends SelectHTMLAttributes<HTMLSelectElement> {
	textSize?: UI_Sizes;
	selectVariant?: SelectVariants;
	options?: { value: string; label: string }[];
	label?: string;
}

const Select = forwardRef<HTMLSelectElement, CustomSelectProps>(
	(props: CustomSelectProps, ref) => {
		const {
			className,
			textSize,
			selectVariant = "standar",
			options,
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
			selectVariant == "standar"
				? "border rounded"
				: selectVariant == "border-bottom"
				? "border-b"
				: "outline-none";

		const content = (
			<select
				ref={ref}
				{...otherPros}
				className={`w-full px-4 py-2  ${variantClass} ${sizeClass} ${className}`}
			>
				<option value="">Seleccione una opción</option>

				{options &&
					options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
			</select>
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

export default Select;
