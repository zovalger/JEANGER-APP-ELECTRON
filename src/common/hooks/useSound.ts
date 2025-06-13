import { Sound } from "../interfaces/Sounds";
import useSoundStore from "../store/useSoundStore";

const useSound = () => {
	const currentsSounds = useSoundStore((state) => state.currentsSounds);
	const onActiveSound = useSoundStore((state) => state.onActiveSound);
	const onUnactiveSound = useSoundStore((state) => state.onUnactiveSound);

	const unactiveSound = (sound: Sound) => onUnactiveSound(sound);

	const activeSound = (sound: Sound, options?: { duration?: number }) => {
		onActiveSound(sound);

		if (options?.duration)
			setTimeout(() => unactiveSound(sound), options.duration);
	};

	return { currentsSounds, activeSound, unactiveSound };
};

export default useSound;
