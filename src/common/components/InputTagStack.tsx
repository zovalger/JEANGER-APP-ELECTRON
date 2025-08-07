import { v4 as uuid } from "uuid";
import { useState, forwardRef, InputHTMLAttributes } from "react";
import { UI_Sizes } from "../interfaces/UI_Sizes";
import Text from "./Text";
import Input from "./Input";
import Chip from "./Chip";

type InputVariants = "standar" | "without-border" | "border-bottom";

export interface InputTagStackProps
	extends InputHTMLAttributes<HTMLInputElement> {
	textSize?: UI_Sizes;
	inputVariant?: InputVariants;
	label: string;
	data: string[];
	setData: (data: string[]) => void;
	helperText?: string;
	errorText?: string;
}

const InputTagStack = forwardRef<HTMLInputElement, InputTagStackProps>(
	(props: InputTagStackProps, ref) => {
		const {
			label,
			data,
			setData,
			helperText,
			errorText,
			className,
			...otherPros
		} = props;

		const [keywordInput, setKeywordInput] = useState("");

		const onAddKeyword = () => {
			const value = keywordInput.trim().split(" ");

			setKeywordInput("");

			if (!value[0]) return;

			const newKeywords = [
				...data,
				...value.filter((item) => !data.includes(item)),
			].sort();

			setData(newKeywords);
		};

		const onDeleteKeyword = (keyword: string) => {
			if (!data) return;

			setData(data.filter((k) => k !== keyword));
		};

		return (
			<div className={`flex w-full flex-col gap-1 ${className}`}>
				<Text variant="bold">{label}</Text>

				<div className="flex flex-wrap gap-2">
					{data.map((keyword) => (
						<Chip
							key={uuid()}
							label={keyword}
							onDelete={() => onDeleteKeyword(keyword)}
						/>
					))}
				</div>

				<div>
					<Input
						className={className}
						{...otherPros}
						ref={ref}
						type="text"
						value={keywordInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onAddKeyword();
							}
						}}
						onBlur={() => onAddKeyword()}
						onChange={({ target: { value } }) => setKeywordInput(value)}
					/>
				</div>
			</div>
		);
	}
);

export default InputTagStack;
