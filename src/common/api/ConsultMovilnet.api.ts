import { ISaldoMovilnet } from "../interfaces/SaldoMovilnet.interface";
import jeangerApp_API from "../config/AxiosInstance";

const url = `utility`;

// ***************** consultas	*****************

export const getSaldoMovilnet_Request = async (
	phoneNumber: string
): Promise<ISaldoMovilnet> =>
	(await jeangerApp_API.get(`${url}/movilnet/?phoneNumber=${phoneNumber}`))
		.data;
