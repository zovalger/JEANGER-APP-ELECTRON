import React, { useRef, useEffect } from "react";

interface props {
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: (v: boolean) => void;
}

const Popover = (props: props) => {
	const { children, isOpen, setIsOpen } = props;

	const popoverRef = useRef(null);
	// Maneja los clics fuera del popover para cerrarlo
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (popoverRef.current && !popoverRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		isOpen && (
			<div
				onClick={() => setIsOpen(!isOpen)}
				ref={popoverRef}
				className="absolute flex flex-col rounded-md shadow-lg bg-white focus:outline-none"
			>
				{children}
			</div>
		)
	);
};

export default Popover;
