import { useEffect, useState } from "react";
import useRequest from "../../common/hooks/useRequest";
import useUserStore from "../../common/store/useUserStore";
import { UserUrls } from "../api/user-url";
import { LoginUserDto } from "../dto";
import { ISessionToken, IUser } from "../interfaces";

interface Options {
	userId?: string;
}

const useUser = (options?: Options) => {
	const userLogged = useUserStore((state) => state.userLogged);
	const users = useUserStore((state) => state.users);
	const sessionToken = useUserStore((state) => state.sessionToken);
	const onSetSessionToken = useUserStore((state) => state.onSetSessionToken);
	const onLogout = useUserStore((state) => state.onLogout);
	const onSetUsers = useUserStore((state) => state.onSetUsers);
	const onSetUser = useUserStore((state) => state.onSetUser);
	const onSetUserProfile = useUserStore((state) => state.onSetUserProfile);

	const { jeangerApp_API } = useRequest();
	const [first, setFirst] = useState(true);

	const [user, setUser] = useState<null | IUser>(null);

	const getProfile = async (id?: string) => {
		try {
			const { data: user } = await jeangerApp_API.get<IUser>(
				id ? UserUrls.userById(id) : UserUrls.user()
			);

			if (!id) onSetUserProfile(user);

			onSetUser(user._id, user);

			return user;
		} catch (error) {
			console.log(error);
		}
	};

	const login = async (data: LoginUserDto) => {
		try {
			const { data: sesion } = await jeangerApp_API.post<ISessionToken>(
				UserUrls.login(),
				data
			);

			onSetSessionToken(sesion);
		} catch (error) {
			console.log(error);
			throw new Error(error?.message || "login error");
		}
	};

	const logout = async () => {
		try {
			await jeangerApp_API.post<ISessionToken>(UserUrls.logout());
			onLogout();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!first) return;
		setFirst(false);

		if (!options) return;

		if (options.userId) {
			try {
				getProfile(options.userId).then((data) => setUser(data));
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return { userLogged, sessionToken, user, users, login, logout, getProfile };
};

export default useUser;
