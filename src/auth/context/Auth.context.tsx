import React, { createContext, useContext, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import RouterLinks from "../../common/config/RouterLinks";
import useRequest from "../../common/hooks/useRequest";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

interface props {
	children?: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
	const { jeangerApp_API } = useRequest();
	const {
		isAuth,
		sessionToken,
		getProfile,
		getShortToken,
		refreshSessionToken,
		logout,
		removeSavedSession,
	} = useUser();
	const navigate = useNavigate();

	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!sessionToken) return;

		getProfile();

		if (!timer)
			setTimer(
				setTimeout(
					() =>
						getShortToken(refreshSessionToken.token).catch(async (err) => {
							if (err.statusCode == 401) {
								await logout();
								await removeSavedSession(refreshSessionToken);
							}
						}),
					new Date(sessionToken.expiration).getTime() - Date.now() - 30000
				)
			);

		return () => {
			clearTimeout(timer);
		};
	}, [jeangerApp_API, sessionToken]);

	if (!isAuth) {
		navigate(RouterLinks.Login);
		return "";
	}

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
