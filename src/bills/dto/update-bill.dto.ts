import { CreateBillDto } from "./create-bill.dto";

export interface UpdateBillDto extends Partial<CreateBillDto> {
	_id: string;
}
