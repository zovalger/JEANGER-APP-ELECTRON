import { Link } from "react-router-dom";
import useButtonAspect, { ButtonProps } from "../hooks/useButtonAspect";

const IconButton = (props: Omit<ButtonProps, "typeButton">) => {
	const {
		className,
		onClick,
		IconComponent,
		href,
		stopPropagation,
		...otherPros
	} = useButtonAspect({
		...props,
		typeButton: "icon",
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
		</button>
	);
};

export default IconButton;
