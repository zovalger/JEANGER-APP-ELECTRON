import axios from "axios";
import { API_SERVER_URL } from ".";
// import { getToken } from "@/app/system/user/helper/userLocalStorage.helper";

const jeangerApp_API = axios.create({
	baseURL: API_SERVER_URL,
	// withCredentials: true,
});

jeangerApp_API.interceptors.request.use((config) => {
	// config.headers["x-access-token"] = getToken();
	return config;
});

export default jeangerApp_API;