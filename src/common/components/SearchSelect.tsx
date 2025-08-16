import { forwardRef, useState, useEffect, useRef } from "react";
import Input, { CustomInputProps } from "./Input";
import Text from "./Text";

// ... (tus interfaces y la función searchOptionsByWord son correctas, las omito para no duplicar) ...

type SelectVariants = "standar" | "without-border" | "border-bottom";

interface SelectOptions {
	value: string;
	label: string;
}

export interface CustomSearchSelectProps extends CustomInputProps {
	selectVariant?: SelectVariants;
	options?: SelectOptions[];
}

export const escapeRegExp = (string: string): string => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const searchOptionsByWord = (
	query: string,
	options: SelectOptions[]
): SelectOptions[] => {
	if (!options) return [];
	if (!query) return options;

	const escapedQuery = escapeRegExp(query);

	const regExps = escapedQuery
		.trim()
		.split(" ")
		.filter((word) => !!word)
		.map((word) => new RegExp(`${word}`, "i"));

	const result = options.filter((option) => {
		let score = 0;
		regExps.forEach((reg) => {
			if (reg.test(option.label)) score++;
		});

		return score > 0;
	});

	return result;
};

const SearchSelect = forwardRef<HTMLInputElement, CustomSearchSelectProps>(
	(props, ref) => {
		const {
			selectVariant = "standar",
			onChange,
			options,
			className,
			value,
			...otherProps
		} = props;

		const [inputValue, setInputValue] = useState("");
		const [isFocused, setIsFocused] = useState(false);
		const containerRef = useRef<HTMLDivElement>(null);

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		};

		const handleSelect = (item: SelectOptions) => {
			setInputValue(item.label);
			setIsFocused(false);

			const syntheticEvent = {
				target: {
					value: item.value,
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onChange?.(syntheticEvent);
		};

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					containerRef.current &&
					!containerRef.current.contains(event.target as Node)
				) {
					setIsFocused(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [containerRef]);

		const filteredOptions = searchOptionsByWord(inputValue, options);
		const showOptions =
			isFocused && inputValue.length > 0 && filteredOptions.length > 0;

		return (
			<div
				className={`relative flex flex-col-reverse ${className} `}
				ref={containerRef}
			>
				<Input
					{...otherProps}
					ref={ref}
					onChange={handleInputChange}
					onFocus={() => setIsFocused(true)}
					value={inputValue}
				/>

				{showOptions && (
					<div className="absolute left-0 right-0 bottom-full mt-1 bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-y-auto z-50">
						{filteredOptions.map((item) => (
							<Text
								key={item.value}
								className="px-4 py-2 cursor-pointer hover:bg-gray-100"
								onClick={() => handleSelect(item)}
							>
								{item.label}
							</Text>
						))}
					</div>
				)}
			</div>
		);
	}
);

export default SearchSelect;
