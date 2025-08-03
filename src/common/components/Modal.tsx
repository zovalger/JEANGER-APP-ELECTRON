import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLDivElement> {
	onClose?: () => void;
	visible?: boolean;
}

const Modal = (props: props) => {
	const { onClose, children, visible, ...otherPros } = props;

	if (!visible) return;

	return (
		<div
			className="fixed top-0 bottom-0 left-0 right-0 flex bg-[#0003] justify-center items-center z-50 "
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					e.stopPropagation();
					onClose?.();
				}
			}}
			onClick={(e) => {
				e.stopPropagation();
				onClose?.();
			}}
			{...otherPros}
		>
			<div
				className="flex-col bg-white mx-4 px-4 py-3 max-h-[90vh] overflow-y-auto rounded shadowlg shadow-neutral-500"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
