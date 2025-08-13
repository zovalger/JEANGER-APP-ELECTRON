import { DeleteBillFromServerDto } from "../dto";
import useUser from "../../auth/hooks/useUser";
import useBill from "../hooks/useBill";
import ConfirmModal from "../../common/components/ConfirmModal";
import Text from "../../common/components/Text";
import { useEffect } from "react";

interface props {
	data: DeleteBillFromServerDto;
}

const DeleteRequestItem = (props: props) => {
	const { data: DData } = props;
	const { data, userId } = DData;

	const { user } = useUser({ userId });
	const { bill, removeDeleteRequest } = useBill({ billId: data._id });

	useEffect(() => {
		setTimeout(() => {
			if (!bill) removeDeleteRequest(data._id, true);
		}, 380000);
	}, []);

	if (!user || !bill) return;

	return (
		<ConfirmModal
			modalText="Eliminación de Factura"
			confirmText="Si"
			onConfirm={() => removeDeleteRequest(bill._id, true)}
			cancelText="No"
			onCancel={() => removeDeleteRequest(bill._id)}
		>
			<Text inlineBlock>El usuario</Text>
			<Text inlineBlock variant="bold">
				{user.name} {user.lastname}
			</Text>
			<Text inlineBlock>eliminó</Text>
			<Text inlineBlock>
				{bill.name
					? `la factura "${bill.name}",`
					: "una factura creada por ti,"}
			</Text>
			<Text inlineBlock>de un monto de</Text>
			<Text inlineBlock variant="bold">
				{bill.totals.BSF.toFixed(2)}bs / {bill.totals.USD.toFixed(2)}$
			</Text>
			<Text>¿quieres conservarla?</Text>
		</ConfirmModal>
	);
};

export default DeleteRequestItem;
