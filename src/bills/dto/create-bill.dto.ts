import { CurrencyType } from "../../common/enums";

interface BillItemDto {
  productId: string 
 quantity: number;
  cost: number;
  currencyType: CurrencyType;
  createdAt:  string;
  updatedAt:  string;
}

interface TotalsDto {
  BSF: number;
  USD: number;
}

export interface CreateBillDto {
  tempId: string;
  name?: string;
  items?: BillItemDto[];
  // foreignExchange?: string;
  totals?: TotalsDto;
  // @IsMongoId()
  // createdBy: string;
  createdAt: string;
  updatedAt: string;
}
