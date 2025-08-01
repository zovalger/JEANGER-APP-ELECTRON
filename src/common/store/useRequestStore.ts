import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_SERVER_URL } from "../config";

interface IRequestState {
	mainServer: string;
	servers: string[];
}

interface IRequestActions {
	onSetMainServer: (url: string) => void;
	onSetServers: (urls: string[]) => void;
}

interface IRequestStore extends IRequestState, IRequestActions {}

const useRequestStore = create<IRequestStore>()(
	persist<IRequestStore>(
		(set) => ({
			mainServer: API_SERVER_URL,
			servers: [],
			onSetMainServer: (url) => {
				set((state) => ({ ...state, mainServer: url }));
			},
			onSetServers: (urls) => {
				set((state) => ({ ...state, servers: urls }));
			},
		}),
		{ name: "request-store" }
	)
);

export default useRequestStore;
