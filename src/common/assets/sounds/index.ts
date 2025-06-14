import { Sound } from "../../interfaces/Sounds";
import alarmSound from "./stopwatch_alarm.mp3"; // Importa el archivo de sonido

const SoundsMap: Record<Sound, { src: string; loop: boolean }> = {
	sound_not_found: { src: "", loop: false },
	StopwatchAlarm: { src: alarmSound, loop: true },
};

export default SoundsMap;
