export const UserUrls = {
	login: () => "/auth/login",
	logout: () => "/auth/logout",
	user: () => "/user",
	userById: (id: string) => `/user/${id}`,
	changePassword: () => "/user/password",
};
