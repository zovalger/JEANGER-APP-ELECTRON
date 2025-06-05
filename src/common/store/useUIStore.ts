import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUIState {
	leftPanelOpen: boolean;
	rightPanelOpen: boolean;
}

interface IUIActions {
	onOpenLeftPanel: () => void;
	onCloseLeftPanel: () => void;
	onOpenRightPanel: () => void;
	onCloseRightPanel: () => void;
	onToogleLeftPanel?: () => void;
	onToogleRightPanel?: () => void;
}

interface IUIStore extends IUIState, IUIActions {}

const useUIStore = create<IUIStore>()(
	persist<IUIStore>(
		(set) => ({
			leftPanelOpen: false,
			rightPanelOpen: false,

			onOpenLeftPanel: () => {
				set((state) => ({ ...state, leftPanelOpen: true }));
			},
			onCloseLeftPanel: () => {
				set((state) => ({ ...state, leftPanelOpen: false }));
			},
			onOpenRightPanel: () => {
				set((state) => ({ ...state, rightPanelOpen: true }));
			},
			onCloseRightPanel: () => {
				set((state) => ({ ...state, rightPanelOpen: false }));
			},

			onToogleLeftPanel: () => {
				set((state) => ({
					...state,
					leftPanelOpen: !state.leftPanelOpen,
				}));
			},
			onToogleRightPanel: () => {
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
