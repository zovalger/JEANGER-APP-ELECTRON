import useSound from "../hooks/useSound";
import SoundsMap from "../assets/sounds";

export const SoundPlayer = () => {
	const { currentsSounds } = useSound();

	return currentsSounds.map((item) => (
		<audio key={item} autoPlay {...SoundsMap[item]} />
	));
};
