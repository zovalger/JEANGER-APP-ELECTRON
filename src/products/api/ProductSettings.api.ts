import jeangerApp_API from "../../common/config/AxiosInstance";
import { IProductSettings } from "../interfaces/product_settings.interface";

const url = `/product_settings`;

// *******************************************************************
// 													Products settings
// *******************************************************************

// ***************** consultas	*****************

export const getProductSettingRequest = async (): Promise<IProductSettings> =>
	(await jeangerApp_API.get(`${url}/`)).data;

// ***************** modificaciones	*****************

export const updateProductRequest = async (
	data: IProductSettings
): Promise<IProductSettings> =>
	(await jeangerApp_API.put(`${url}/`, data)).data;
