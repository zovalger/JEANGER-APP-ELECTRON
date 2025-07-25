import jeangerApp_API from "../../common/config/AxiosInstance";
import { Stopwatch } from "../interfaces/Stopwatch.interface";

const url = `/stopwatch`;

export const getAllStopwatchRequest = async (): Promise<Stopwatch[]> =>
	(await jeangerApp_API.get(`${url}`)).data;
