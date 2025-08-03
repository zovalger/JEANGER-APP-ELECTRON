import { useEffect, useState } from "react";
import useRequestStore from "../store/useRequestStore";
import useUserStore from "../store/useUserStore";
import HttpClient from "../config/HttpClient";

const useRequest = () => {
	const sessionToken = useUserStore((state) => state.sessionToken);
	const mainServer = useRequestStore((state) => state.mainServer);

	const [jeangerApp_API, setJeangerApp_API] = useState<HttpClient>(
		new HttpClient(mainServer, { token: sessionToken?.token || null })
	);

	useEffect(() => {
		setJeangerApp_API(
			new HttpClient(mainServer, { token: sessionToken?.token || null })
		);
	}, [sessionToken]);

	return { jeangerApp_API, sessionToken };
};

export default useRequest;
