import Text from "./Text";
import useButtonAspect, { ButtonProps } from "../hooks/useButtonAspect";

const Button = (props: Omit<ButtonProps, "typeButton">) => {
	const { className, onClick, IconComponent, href, children, ...otherPros } =
		useButtonAspect({
			...props,
			typeButton: "normal",
		});

	if (href)
		return (
			<a href={href} className={className}>
				{IconComponent && <IconComponent />}
				<Text>{children}</Text>
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
			<Text>{children}</Text>
		</button>
	);
};

export default Button;
