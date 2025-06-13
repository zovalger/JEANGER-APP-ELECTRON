import { useRef } from "react";
import useSound from "../hooks/useSound";

export const SoundPlayer = () => {
	const { currentsSounds } = useSound();

	const audioRef = useRef(null); // Referencia para el aud

	// // Función para reproducir el sonido
	// 	const playSound = () => {
	// 		if (audioRef.current) {
	// 			audioRef.current
	// 				.play()
	// 				.catch((err) => console.error("Error al reproducir el sonido:", err));
	// 		}
	// 	};

	// 	// Función para detener y reiniciar el sonido
	// 	const stopAndResetSound = () => {
	// 		if (audioRef.current) {
	// 			audioRef.current.pause();
	// 			audioRef.current.currentTime = 0; // Reinicia el audio al inicio
	// 		}
	// 	};

	// todo: buscar la forma de reproducir el array de sonidos

	return (
		<>
			{currentsSounds.map((item) => (
				<audio ref={audioRef} src={item} />
			))}
		</>
	);
};
