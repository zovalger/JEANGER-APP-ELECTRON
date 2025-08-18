import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ISessionToken, IUser } from "../../auth/interfaces";

interface IUserState {
	sessionToken: ISessionToken | null;
	refreshSessionToken: ISessionToken | null;
	savedSessions: ISessionToken[];
	userLogged: IUser | null;
	users: IUser[];
}

interface IUserActions {
	onSetSessionToken: (sessionToken: ISessionToken) => void;
	onSetRefreshSessionToken: (sessionToken: ISessionToken | null) => void;
	onLogout: () => void;
	onSetUserProfile: (user: IUser) => void;
	onSetUsers: (users: IUser[]) => void;
	onSetUser: (id: string, users: IUser) => void;
	onGetUser: (id: string) => IUser;
	onAddSavedSession: (sessionToken: ISessionToken) => void;
	onRemoveSavedSession: (id: string) => void;
}

interface IUserStore extends IUserState, IUserActions {}

const useUserStore = create<IUserStore>()(
	devtools(
		persist<IUserStore>(
			(set, get) => ({
				sessionToken: null,
				refreshSessionToken: null,
				userLogged: null,
				users: [],
				savedSessions: [],

				onSetSessionToken: (sessionToken) => {
					set((state) => ({ ...state, sessionToken }));
				},
				onSetRefreshSessionToken: (sessionToken) => {
					set((state) => ({ ...state, refreshSessionToken: sessionToken }));
				},
				onLogout: () =>
					set((state) => ({
						...state,
						sessionToken: null,
						refreshSessionToken: null,
						userLogged: null,
						users: [],
					})),
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

						if (!b) return { ...state, users: [...users, user] };

						return {
							...state,
							users: users.map((item) => (item._id == id ? user : item)),
						};
					}),

				onGetUser: (id) => get().users.find((item) => item._id == id),

				onAddSavedSession: (session) =>
					set((state) => {
						const { savedSessions } = state;

						const b = savedSessions.find(
							(item) => item.userId == session.userId
						);

						if (!b)
							return { ...state, savedSessions: [...savedSessions, session] };

						return {
							...state,
							savedSessions: savedSessions.map((item) =>
								item.userId == session.userId ? session : item
							),
						};
					}),

				onRemoveSavedSession: (id) =>
					set((state) => {
						const { savedSessions } = state;

						return {
							...state,
							savedSessions: savedSessions.filter((item) => item._id !== id),
						};
					}),
			}),
			{ name: "user-store" }
		)
	)
);

export default useUserStore;
