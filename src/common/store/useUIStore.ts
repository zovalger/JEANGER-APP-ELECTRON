import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUI {
	leftPanelOpen: boolean;
	rightPanelOpen: boolean;
}

interface IUIActions {
	openLeftPanel: () => void;
	closeLeftPanel: () => void;
	openRightPanel: () => void;
	closeRightPanel: () => void;
}

interface IUIStore extends IUI, IUIActions {}

const useUIStore = create<IUIStore>()(
	persist<IUIStore>(
		(set) => ({
			leftPanelOpen: false,
			rightPanelOpen: true,

			openLeftPanel: () => {
				set((state) => ({ ...state, leftPanelOpen: true }));
			},
			closeLeftPanel: () => {
				set((state) => ({ ...state, leftPanelOpen: false }));
			},
			openRightPanel: () => {
				set((state) => ({ ...state, rightPanelOpen: true }));
			},
			closeRightPanel: () => {
				set((state) => ({ ...state, rightPanelOpen: false }));
			},
		}),
		{ name: "ui-store" }
	)
);

export default useUIStore;
