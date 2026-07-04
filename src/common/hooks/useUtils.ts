import { ICIVenezuelan } from "../interfaces/CIVenezuelan.interface";
import { IMovilnetBalance } from "../interfaces/SaldoMovilnet.interface";
import { VenezuelanQueryDto } from "../interfaces/venezuelan-query.dto";
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

	const getVenezuelan = async ({
		CI,
		nationality,
	}: VenezuelanQueryDto): Promise<ICIVenezuelan> => {
		try {
			const { data } = await jeangerApp_API.get<ICIVenezuelan>(
				`/utils/venezuelan-data?nationality=${nationality}&CI=${CI}`
			);

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error.message || "error al obtener Datos");
		}
	};

	return { getSaldoMovilnet, getVenezuelan };
};

export default useUtils;
