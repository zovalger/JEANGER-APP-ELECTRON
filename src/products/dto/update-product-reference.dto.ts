import { CreateProductReferenceDto } from "./create-product-reference.dto";

export interface UpdateProductReferenceDto
	extends Partial<Pick<CreateProductReferenceDto, "amount" | "percentage">> {}
