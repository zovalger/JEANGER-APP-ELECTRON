import useUIStore from "../store/useUIStore";

const useUI = () => {
	const leftPanelOpen = useUIStore((state) => state.leftPanelOpen);
	const rightPanelOpen = useUIStore((state) => state.rightPanelOpen);
	const openLeftPanel = useUIStore((state) => state.openLeftPanel);
	const closeLeftPanel = useUIStore((state) => state.closeLeftPanel);
	const openRightPanel = useUIStore((state) => state.openRightPanel);
	const closeRightPanel = useUIStore((state) => state.closeRightPanel);

	return {
		leftPanelOpen,
		rightPanelOpen,
		openLeftPanel,
		closeLeftPanel,
		openRightPanel,
		closeRightPanel,
	};
};

export default useUI;
