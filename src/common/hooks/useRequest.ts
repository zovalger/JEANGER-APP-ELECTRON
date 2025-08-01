import { useEffect, useState } from "react";
import useRequestStore from "../store/useRequestStore";
import useUserStore from "../store/useUserStore";
import HttpClient from "../config/HttpClient";

const useRequest = () => {
	const sessionToken = useUserStore((state) => state.sessionToken);
	const mainServer = useRequestStore((state) => state.mainServer);

	const [jeangerApp_API, setJeangerApp_API] = useState<HttpClient>(
		new HttpClient(mainServer)
	);

	useEffect(() => {
		setJeangerApp_API(
			new HttpClient(mainServer, { token: sessionToken?.token || null })
		);

		return () => {
			setJeangerApp_API(null);
		};
	}, [sessionToken]);

	return { jeangerApp_API };
};

export default useRequest;
