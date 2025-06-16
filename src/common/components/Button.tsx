import Text from "./Text";
import useButtonAspect, { ButtonProps } from "../hooks/useButtonAspect";
import { Link } from "react-router-dom";

const Button = (props: Omit<ButtonProps, "typeButton">) => {
	const {
		className,
		size,
		onClick,
		IconComponent,
		href,
		children,
		stopPropagation,
		...otherPros
	} = useButtonAspect({
		...props,
		typeButton: "normal",
	});

	if (href)
		return (
			<Link
				to={href}
				className={className}
				onClick={(e) => {
					if (stopPropagation) e.stopPropagation();
					if (onClick) onClick(e);
				}}
			>
				{IconComponent && <IconComponent />}
				<Text size={size} className={IconComponent ? "ml-2" : "0"}>
					{children}
				</Text>
			</Link>
		);

	return (
		<button
			{...otherPros}
			onClick={(e) => {
				if (stopPropagation) e.stopPropagation();
				if (onClick) onClick(e);
			}}
			className={className}
		>
			{IconComponent && <IconComponent />}
			<Text size={size} className={IconComponent ? "ml-2" : "0"}>
				{children}
			</Text>
		</button>
	);
};

export default Button;
