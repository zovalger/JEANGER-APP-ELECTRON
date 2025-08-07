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
	helperText?: string;
	errorText?: string;
}

const Select = forwardRef<HTMLSelectElement, CustomSelectProps>(
	(props: CustomSelectProps, ref) => {
		const {
			className,
			textSize,
			selectVariant = "standar",
			options,
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
			selectVariant == "standar"
				? "border rounded"
				: selectVariant == "border-bottom"
				? "border-b"
				: "outline-none";

		const content = (
			<>
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

export default Select;
