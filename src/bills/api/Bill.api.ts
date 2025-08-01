import jeangerApp_API from "../../common/config/HttpClient";
import { IBill } from "../interfaces/bill.interface";

const url = `/bill`;

export const getAllBillsRequest = async (): Promise<IBill[]> =>
	(await jeangerApp_API.get(`${url}`)).data;
