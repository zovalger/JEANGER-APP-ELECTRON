import { create } from "zustand";
import { Sound } from "../interfaces/Sounds";

interface ISoundState {
	currentsSounds: Sound[];
}

interface ISoundActions {
	onActiveSound: (sound: Sound) => void;
	onUnactiveSound: (sound: Sound) => void;
}

interface ISoundStore extends ISoundState, ISoundActions {}

const useSoundStore = create<ISoundStore>((set) => ({
	currentsSounds: [],
	onActiveSound: (sound: Sound) =>
		set((state) => {
			const { currentsSounds } = state;

			if (currentsSounds.includes(sound)) return { ...state };

			return { ...state, currentsSounds: [...currentsSounds, sound] };
		}),
	onUnactiveSound: (sound: Sound) =>
		set((state) => {
			const { currentsSounds } = state;

			if (!currentsSounds.includes(sound)) return state;

			return {
				...state,
				currentsSounds: currentsSounds.filter((item) => item !== sound),
			};
		}),
}));

export default useSoundStore;
