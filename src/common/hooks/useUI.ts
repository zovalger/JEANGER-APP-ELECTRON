import useUIStore from "../store/useUIStore";

const useUI = () => {
	const leftPanelOpen = useUIStore((state) => state.leftPanelOpen);
	const rightPanelOpen = useUIStore((state) => state.rightPanelOpen);
	const openLeftPanel = useUIStore((state) => state.onOpenLeftPanel);
	const closeLeftPanel = useUIStore((state) => state.onCloseLeftPanel);
	const openRightPanel = useUIStore((state) => state.onOpenRightPanel);
	const closeRightPanel = useUIStore((state) => state.onCloseRightPanel);
	const toogleLeftPanel = useUIStore((state) => state.onToogleLeftPanel);
	const toogleRightPanel = useUIStore((state) => state.onToogleRightPanel);

	return {
		leftPanelOpen,
		rightPanelOpen,
		openLeftPanel,
		closeLeftPanel,
		openRightPanel,
		closeRightPanel,
		toogleLeftPanel,
		toogleRightPanel,
	};
};

export default useUI;
