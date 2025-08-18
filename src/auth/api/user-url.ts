export const UserUrls = {
	login: () => "/auth/login",
		refresh: () => "/auth/refresh",
	logout: () => "/auth/logout",
	user: () => "/user",
	userById: (id: string) => `/user/${id}`,
	changePassword: () => "/user/password",
};
