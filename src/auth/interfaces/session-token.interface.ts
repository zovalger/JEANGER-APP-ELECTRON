import { TokenTypes } from "../enum";

export interface ISessionToken {
	_id: string;
	userId: string;
	token: string;
	type: TokenTypes;
	expiration: string;
	createdAt: string;
	updatedAt: string;
}
