import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { StopwatchContextProvider } from "../../stopwatch/context/Stopwatch.context";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { SoundPlayer } from "../components/SoundPlayer";
import { SocketContextProvider } from "../context/Socket.context";
import { BillContextProvider } from "../../bills/context/Bill.context";
import { AuthContextProvider } from "../../auth/context/Auth.context";
import useRequest from "../hooks/useRequest";
import useProduct from "../../products/hooks/useProduct";
import { ForeignExchangeContextProvider } from "../../foreign_exchange/context/ForeignExchange.context";

interface BackgroundProcessesLayoutProps {
	children?: React.ReactNode;
}

const BackgroundProcessesLayout = (
	backgroundProcessesLayoutProps: BackgroundProcessesLayoutProps
) => {
	const { children } = backgroundProcessesLayoutProps;

	const { jeangerApp_API, sessionToken } = useRequest();

	const { getForeignExchange } = useForeignExchange();
	const { getProductSettings } = useProduct();

	useEffect(() => {
		if (!sessionToken) return;

		getForeignExchange().catch((err) => console.log(err));
		getProductSettings().catch((err) => console.log(err));
	}, [jeangerApp_API]);

	return (
		<AuthContextProvider>
			<SocketContextProvider>
				<ForeignExchangeContextProvider>
					<BillContextProvider>
						<StopwatchContextProvider>
							<SoundPlayer />
							{children || <Outlet />}
						</StopwatchContextProvider>
					</BillContextProvider>
				</ForeignExchangeContextProvider>
			</SocketContextProvider>
		</AuthContextProvider>
	);
};

export default BackgroundProcessesLayout;
