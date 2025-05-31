import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
	animationType?: "fade" | "slide";
	transparent?: boolean;
	onClose?: () => void;
	visible?: boolean;
}

const Modal = (props: props) => {
	const { children, ...otherPros } = props;

	return (
		<div className="" animationType="fade" transparent={true} {...otherPros}>
			<div className="flex-1 bg-[#0003] justify-center align-center">
				<div className="bg-white mx-4 px-4 py-3 rounded  shadowlg shadow-neutral-500">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
