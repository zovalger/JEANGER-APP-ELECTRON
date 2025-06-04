import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
	size?: "full" | "half" | "quarter";
}

const Skeleton = (props: props) => {
	const { className, size } = props;

	const sizeClass =
		size === "full"
			? "w-full"
			: size === "half"
			? "w-1/2"
			: size === "quarter"
			? "w-1/4"
			: "w-full";

	return (
		<div
			{...props}
			className={`animate-pulse bg-gray-500 h-3 rounded-2xl ${sizeClass} ${className}`}
		></div>
	);
};

export default Skeleton;
