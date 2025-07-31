import { UserPermissions } from "../enum";

export interface IUser {
	_id: string;
	email: string;
	password: string;
	permissions: UserPermissions[];
	name: string;
	lastname: string;
	identityColor: string;
	photoURL: string;
	createdAt: string;
	updatedAt: string;
}
