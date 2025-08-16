import React, { HTMLAttributes, useState } from "react";
import Text from "./Text";
import IconButton from "./IconButton";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
	label: string;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

const Accordion = (props: AccordionProps) => {
	const { label, open = false, setOpen, className, children, ...rest } = props;

	const [isOpen, setIsOpen] = useState(false);

	const hanndleToggle = () => {
		if (setOpen) return setOpen(!open);

		setIsOpen(!isOpen);
	};

	const trustOpen = setOpen ? open : isOpen;

	return (
		<div {...rest} className={`${className}`}>
			<div
				className="flex items-center mb-4 hover:cursor-pointer hover:bg-gray-100"
				onClick={hanndleToggle}
			>
				<Text className="flex-1" variant="bold">
					{label}
				</Text>
				<IconButton
					className={`transform duration-100  ${
						trustOpen ? " rotate-180" : ""
					}`}
					icon={"ChevronDown"}
					type="button"
					size="small"
					onClick={hanndleToggle}
				/>
			</div>

			<div
				className={`transform duration-300 transition-all  ${
					trustOpen ? "h-fit p-4 " : " h-0 overflow-hidden  "
				}`}
			>
				{children}
			</div>
		</div>
	);
};

export default Accordion;
