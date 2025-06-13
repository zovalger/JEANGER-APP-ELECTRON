import { Outlet } from "react-router-dom";
import { StopwatchContextProvider } from "../../stopwatch/context/Stopwatch.context";

interface BackgroundProcessesLayoutProps {
	// Define any props if needed
	children?: React.ReactNode;
}

const BackgroundProcessesLayout = (
	backgroundProcessesLayoutProps: BackgroundProcessesLayoutProps
) => {
	const { children } = backgroundProcessesLayoutProps;

	return (
		<>
			<StopwatchContextProvider>
				{children || <Outlet />}
			</StopwatchContextProvider>
		</>
	);
};

export default BackgroundProcessesLayout;
