import Text from "./Text";
import useButtonAspect, { ButtonProps } from "../hooks/useButtonAspect";

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
			<a href={href} className={className}>
				{IconComponent && <IconComponent />}
				<Text size={size} className="ml-2">
					{children}
				</Text>
			</a>
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
