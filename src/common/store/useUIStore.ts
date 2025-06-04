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
	toogleLeftPanel?: () => void;
	toogleRightPanel?: () => void;
}

interface IUIStore extends IUI, IUIActions {}

const useUIStore = create<IUIStore>()(
	persist<IUIStore>(
		(set) => ({
			leftPanelOpen: false,
			rightPanelOpen: false,

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

			toogleLeftPanel: () => {
				set((state) => ({
					...state,
					leftPanelOpen: !state.leftPanelOpen,
				}));
			},
			toogleRightPanel: () => {
				set((state) => ({
					...state,
					rightPanelOpen: !state.rightPanelOpen,
				}));
			},
		}),
		{ name: "ui-store" }
	)
);

export default useUIStore;
