import useRequest from "../../common/hooks/useRequest";
import useUserStore from "../../common/store/useUserStore";
import { UserUrls } from "../config/user-url";
import { LoginUserDto } from "../dto";
import { ISessionToken, IUser } from "../interfaces";

const useUser = () => {
	const user = useUserStore((state) => state.user);
	const users = useUserStore((state) => state.users);
	const sessionToken = useUserStore((state) => state.sessionToken);
	const onSetSessionToken = useUserStore((state) => state.onSetSessionToken);
	const onLogout = useUserStore((state) => state.onLogout);
	const onSetUsers = useUserStore((state) => state.onSetUsers);
	const onSetUserProfile = useUserStore((state) => state.onSetUserProfile);

	const { jeangerApp_API } = useRequest();

	const getProfile = async (id?: string) => {
		try {
			const { data: user } = await jeangerApp_API.get<IUser>(
				id ? UserUrls.userById(id) : UserUrls.user()
			);
			console.log(user);
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

			const user = await getProfile();

			onSetUserProfile(user);

			console.log(sesion);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const res = await jeangerApp_API.post<ISessionToken>(UserUrls.logout());

			console.log(res);

			onLogout();
		} catch (error) {
			console.log(error);
		}
	};

	return { login, logout, user, sessionToken, users };
};

export default useUser;
