import { DeleteBillItemDto } from "./delete-bill-item.dto";

export interface DeleteBillItemFromSocketDto
	extends Omit<DeleteBillItemDto, "createdBy"> {
	billId: string;
}
