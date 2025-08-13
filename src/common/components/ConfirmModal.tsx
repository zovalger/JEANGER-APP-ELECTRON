import Text from "./Text";
import Modal from "./Modal";
import Button from "./Button";

interface props {
	modalText?: string;
	confirmText?: string;
	onConfirm(): void;
	cancelText?: string;
	onCancel(): void;
}

const ConfirmModal = (props: props) => {
	const {
		modalText = "Estas seguro?",
		confirmText = "confirmar",
		onConfirm,
		cancelText = "Cancelar",
		onCancel,
	} = props;

	return (
		<Modal visible={true}>
			<Text className="mb-4" size="big" variant="bold">
				{modalText}
			</Text>

			<div className="flex gap-2">
				<Button
					className="flex-1"
					variant="danger"
					onClick={() => onCancel()}
					type="button"
				>
					{cancelText}
				</Button>

				<Button className="flex-1" onClick={() => onConfirm()} type="button">
					{confirmText}
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
