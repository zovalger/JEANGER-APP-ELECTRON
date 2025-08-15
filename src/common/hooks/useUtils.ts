import { IMovilnetBalance } from "../interfaces/SaldoMovilnet.interface";
import useRequest from "./useRequest";

const useUtils = () => {
	const { jeangerApp_API } = useRequest();

	const getSaldoMovilnet = async (
		phoneNumber: string
	): Promise<IMovilnetBalance> => {
		try {
			const { data } = await jeangerApp_API.get<IMovilnetBalance>(
				`/utils/movilnet-balance/?phoneNumber=${phoneNumber}`
			);

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message || "error al obtener balance");
		}
	};

	return { getSaldoMovilnet };
};

export default useUtils;
