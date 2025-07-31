import axios from "axios";
import { IForeignExchange } from "../interfaces/ForeignExchange.interface";
import jeangerApp_API from "../../common/config/AxiosInstance";

const url = `/foreign-exchange`;

// ***************** consultas	*****************

export const getForeignExchangeRequest = async (): Promise<IForeignExchange> =>
	(await jeangerApp_API.get(`${url}`)).data;

export const setForeignExchangeRequest = async (
	data: Omit<IForeignExchange, "bankBusinessDate">
): Promise<IForeignExchange> => (await axios.post(`${url}`, data)).data;

// export const getDolarRequest = async (): Promise<DolarValue> => ({
// 	value: 31.5251,
// 	date: new Date(),
// });
