import useButtonAspect, { ButtonProps } from "../hooks/useButtonAspect";

const IconButton = (props: Omit<ButtonProps, "typeButton">) => {
	const { className, onClick, IconComponent, href, ...otherPros } =
		useButtonAspect({
			...props,
			typeButton: "icon",
		});

	if (href)
		return (
			<a href={href} className={className}>
				{IconComponent && <IconComponent />}
			</a>
		);

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				if (onClick) onClick(e);
			}}
			{...otherPros}
			className={" "+className}
		>
			{IconComponent && <IconComponent />}
		</button>
	);
};

export default IconButton;
