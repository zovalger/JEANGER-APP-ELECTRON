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
	const isAuth = useUserStore((state) => state.isAuth);
	const userLogged = useUserStore((state) => state.userLogged);
	const users = useUserStore((state) => state.users);
	const sessionToken = useUserStore((state) => state.sessionToken);
	const refreshSessionToken = useUserStore(
		(state) => state.refreshSessionToken
	);
	const savedSessions = useUserStore((state) => state.savedSessions);
	const onSetSessionToken = useUserStore((state) => state.onSetSessionToken);
	const onSetRefreshSessionToken = useUserStore(
		(state) => state.onSetRefreshSessionToken
	);
	const onLogout = useUserStore((state) => state.onLogout);
	const onSetUsers = useUserStore((state) => state.onSetUsers);
	const onGetUser = useUserStore((state) => state.onGetUser);
	const onSetUser = useUserStore((state) => state.onSetUser);
	const onSetUserProfile = useUserStore((state) => state.onSetUserProfile);
	const onAddSavedSession = useUserStore((state) => state.onAddSavedSession);
	const onRemoveSavedSession = useUserStore(
		(state) => state.onRemoveSavedSession
	);

	const { jeangerApp_API, jeangerApp_API_Basic } = useRequest();
	const [first, setFirst] = useState(true);

	const [user, setUser] = useState<null | IUser>(null);

	const getProfile = async (id?: string) => {
		try {
			const { data: userData } = await jeangerApp_API.get<IUser>(
				id ? UserUrls.userById(id) : UserUrls.user()
			);

			if (!id) onSetUserProfile(userData);

			onSetUser(userData._id, userData);

			return userData;
		} catch (error) {
			const userData = onGetUser(id);

			if (!userData) throw new Error("usuario no encontrado");

			return userData;
		}
	};

	const getShortToken = async (refreshToken: string) => {
		const { data: sesionShort } =
			await jeangerApp_API_Basic.post<ISessionToken>(
				UserUrls.refresh(),
				{},
				{ headers: { Authorization: `Bearer ${refreshToken}` } }
			);

		onSetSessionToken(sesionShort);

		return sesionShort;
	};

	const login = async (data: LoginUserDto, saveSession = false) => {
		try {
			const { data: sesionlong } =
				await jeangerApp_API_Basic.post<ISessionToken>(UserUrls.login(), data);

			onSetRefreshSessionToken(sesionlong);
			if (saveSession) onAddSavedSession(sesionlong);

			await getShortToken(sesionlong.token);

			return sesionlong;
		} catch (error) {
			console.log(error);
			throw new Error(error?.message || "login error");
		}
	};

	const pickSavedSession = async (sesion: ISessionToken) => {
		if (new Date(sesion.expiration).getTime() < Date.now()) {
			onRemoveSavedSession(sesion._id);
			throw new Error("Sesión vencida");
		}
		onSetRefreshSessionToken(sesion);
		onSetUserProfile(await getProfile(sesion.userId));

		try {
			await getShortToken(sesion.token);
		} catch (error) {
			console.log(error);
		}
	};

	const removeSavedSession = async (sesion: ISessionToken) => {
		onRemoveSavedSession(sesion._id);
	};

	const logout = async (removeSession = false) => {
		if (removeSession) onRemoveSavedSession(sessionToken._id);

		try {
			onLogout();
			await jeangerApp_API.post<ISessionToken>(UserUrls.logout());
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

	return {
		isAuth,
		userLogged,
		sessionToken,
		user,
		users,
		login,
		logout,
		getProfile,
		savedSessions,
		pickSavedSession,
		removeSavedSession,
		refreshSessionToken,
		getShortToken,
	};
};

export default useUser;
