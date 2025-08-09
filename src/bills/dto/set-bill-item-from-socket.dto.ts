import { SetBillItemDto } from "./set-bill-item.dto";

export interface SetBillItemFromSocketDto
	extends Omit<SetBillItemDto, "createdBy"> {
	billId: string;
}
