import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISessionToken, IUser } from "../../auth/interfaces";

interface IUserState {
	sessionToken: ISessionToken | null;
	user: IUser | null;
	users: IUser[];
}

interface IUserActions {
	onSetSessionToken: (sessionToken: ISessionToken) => void;
	onLogout: () => void;
	onSetUserProfile: (user: IUser) => void;
	onSetUsers: (users: IUser[]) => void;
}

interface IUserStore extends IUserState, IUserActions {}

const useUserStore = create<IUserStore>()(
	persist<IUserStore>(
		(set) => ({
			sessionToken: null,
			user: null,
			users: [],

			onSetSessionToken: (sessionToken) => {
				set((state) => ({ ...state, sessionToken }));
			},
			onLogout: () => {
				set((state) => ({
					...state,
					sessionToken: null,
					user: null,
					users: [],
				}));
			},
			onSetUserProfile: (user) => {
				set((state) => ({ ...state, user }));
			},

			onSetUsers: (users) => {
				set((state) => ({ ...state, users }));
			},
		}),
		{ name: "user-store" }
	)
);

export default useUserStore;
