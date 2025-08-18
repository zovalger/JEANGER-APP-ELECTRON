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

	const getShortToken = async (refreshToken: string) => {
		const { data: sesionShort } = await jeangerApp_API.post<ISessionToken>(
			UserUrls.refresh(),
			{},
			{ headers: { Authorization: `Bearer ${refreshToken}` } }
		);

		onSetSessionToken(sesionShort);

		return sesionShort;
	};

	const login = async (data: LoginUserDto, saveSession = false) => {
		try {
			const { data: sesionlong } = await jeangerApp_API.post<ISessionToken>(
				UserUrls.login(),
				data
			);

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
		if (new Date(sesion.expiration).getTime() < Date.now())
			return onRemoveSavedSession(sesion._id);

		await getShortToken(sesion.token);
		onSetRefreshSessionToken(sesion);
	};
	const removeSavedSession = async (sesion: ISessionToken) => {
		onRemoveSavedSession(sesion._id);
	};

	const logout = async (removeSession = false) => {
		if (removeSession) onRemoveSavedSession(sessionToken._id);

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

	return {
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
	};
};

export default useUser;
