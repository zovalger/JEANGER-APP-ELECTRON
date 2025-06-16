import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { StopwatchContextProvider } from "../../stopwatch/context/Stopwatch.context";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { SoundPlayer } from "../components/SoundPlayer";
import { SocketContextProvider } from "../context/Socket.context";
import { BillContextProvider } from "../../bills/context/Bill.context";

interface BackgroundProcessesLayoutProps {
	children?: React.ReactNode;
}

const BackgroundProcessesLayout = (
	backgroundProcessesLayoutProps: BackgroundProcessesLayoutProps
) => {
	const { children } = backgroundProcessesLayoutProps;
	const { getForeignExchange } = useForeignExchange();

	useEffect(() => {
		getForeignExchange().catch((err) => console.log(err));
	}, []);

	return (
		<SocketContextProvider>
			<BillContextProvider>
				<StopwatchContextProvider>
					<SoundPlayer />
					{children || <Outlet />}
				</StopwatchContextProvider>
			</BillContextProvider>
		</SocketContextProvider>
	);
};

export default BackgroundProcessesLayout;
