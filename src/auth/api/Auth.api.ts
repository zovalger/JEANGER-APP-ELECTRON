import jeangerApp_API from "../../common/config/HttpClient";
import { LoginUserDto } from "../dto/login-user.dto";
import { ISessionToken } from "../interfaces";

const url = `/auth`;

export const loginRequest = async (
	data: LoginUserDto
): Promise<ISessionToken> => {
	return (await jeangerApp_API.post(`${url}/login`, data)).data;
};
