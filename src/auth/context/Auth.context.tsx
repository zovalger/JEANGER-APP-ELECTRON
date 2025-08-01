import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";
import { redirect } from "react-router-dom";
import RouterLinks from "../../common/config/RouterLinks";

const AuthContext = createContext({});

interface props {
	children?: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
	const { sessionToken } = useUser();

	if (!sessionToken) {
		// ver permisos

		redirect(RouterLinks.Login);

		return "";
	}

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
