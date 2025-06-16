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
					e.stopPropagation();
					if (onClick) onClick(e);
				}}
			>
				{IconComponent && <IconComponent />}
				<Text size={size} className="ml-2">
					{children}
				</Text>
			</Link>
		);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...otherPros}
			className={className}
		>
			{IconComponent && <IconComponent />}
			<Text size={size} className="ml-2">
				{children}
			</Text>
		</button>
	);
};

export default Button;
