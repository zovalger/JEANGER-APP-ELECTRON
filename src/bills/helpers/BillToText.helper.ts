import moneyFormat from "../../common/helpers/moneyFormat.helper";
import { IForeignExchange } from "../../foreign_exchange/interfaces/ForeignExchange.interface";
import { IBill, IBillItem } from "../interfaces/bill.interface";

export interface IBillItem_CopyToClipboard
	extends Pick<IBillItem, "cost" | "quantity"> {
	productName: string;
	currencyType: string;
}

export const BillItemToText_helper = (
	{ productName, cost, currencyType, quantity = 1 }: IBillItem_CopyToClipboard,
	simplify?: boolean
): string => {
	const q = quantity || 1;

	const total = cost * q;

	if (simplify)
		return `${q} ${productName}: ${moneyFormat(total)} ${currencyType} `;

	return `${q} ${productName} tiene un costo de ${moneyFormat(
		total
	)} ${currencyType} `;
};

export interface IBill_CopyToClipboard extends Omit<IBill, "items"> {
	items: IBillItem_CopyToClipboard[];
}

interface IBillToText {
	bill: IBill_CopyToClipboard;
	foreignExchange: IForeignExchange;
}

export const BillToText_helper = ({ bill }: IBillToText): string => {
	const { items, totals } = bill;

	const itemsText = items.map((i) => BillItemToText_helper(i, true));

	const text = [
		itemsText.join("\n"),
		"",
		`*total: ${moneyFormat(totals.BSF)} bs*`,
	];

	return text.join("\n");
};
