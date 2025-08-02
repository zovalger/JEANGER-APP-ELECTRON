import { createContext, useContext, useEffect } from "react";
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
	const { sessionToken, getProfile } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionToken) getProfile();
	}, [jeangerApp_API, sessionToken]);

	if (!sessionToken) {
		// ver permisos
		navigate(RouterLinks.Login);
		return "";
	}

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
