import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ISessionToken, IUser } from "../../auth/interfaces";

interface IUserState {
	sessionToken: ISessionToken | null;
	userLogged: IUser | null;
	users: IUser[];
}

interface IUserActions {
	onSetSessionToken: (sessionToken: ISessionToken) => void;
	onLogout: () => void;
	onSetUserProfile: (user: IUser) => void;
	onSetUsers: (users: IUser[]) => void;
	onSetUser: (id: string, users: IUser) => void;
	onGetUser: (id: string) => IUser;
}

interface IUserStore extends IUserState, IUserActions {}

const useUserStore = create<IUserStore>()(
	devtools(
		persist<IUserStore>(
			(set, get) => ({
				sessionToken: null,
				userLogged: null,
				users: [],

				onSetSessionToken: (sessionToken) => {
					set((state) => ({ ...state, sessionToken }));
				},
				onLogout: () => {
					set((state) => ({
						...state,
						sessionToken: null,
						userLogged: null,
						users: [],
					}));
				},
				onSetUserProfile: (user) => {
					set((state) => ({ ...state, userLogged: user }));
				},

				onSetUsers: (users) => {
					set((state) => ({ ...state, users }));
				},

				onSetUser: (id, user) =>
					set((state) => {
						const { users } = state;

						const b = users.find((item) => item._id == id);

						if (!b) return { ...state, bills: [...users, user] };

						return {
							...state,
							users: users.map((item) => (item._id == id ? user : item)),
						};
					}),

				onGetUser: (id) => get().users.find((item) => item._id == id),
			}),
			{ name: "user-store" }
		)
	)
);

export default useUserStore;
