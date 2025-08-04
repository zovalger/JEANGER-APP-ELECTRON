import React from "react";
import Text from "./Text";
import IconButton from "./IconButton";

export interface ChipProps {
	// children?: React.ReactNode;
	label: string;
	variant?: "filled" | "outlined";
	color?: "primary" | "secondary" | "error" | "success" | "warning";
	onDelete?: () => void;
	className?: string;
	size?: "small" | "medium" | "large";
	icon?: React.ReactNode;
	iconPosition?: "start" | "end";
	disabled?: boolean;
}

const Chip = (prop: ChipProps) => {
	const {
		label,
		// variant = "filled",
		// color = "primary",
		// size,
		// icon,
		// iconPosition,
		// disabled,
		className,
		onDelete,
		...rest
	} = prop;

	return (
		<div
			className={`flex items-center gap-1 pl-3 rounded-2xl overflow-hidden bg-gray-300 ${className}`}
		>
			<Text>{label}</Text>

			<IconButton
				icon="Close"
				size="tiny"
				type="button"
				onClick={onDelete}
				variant="danger"
			/>
		</div>
	);
};

export default Chip;
