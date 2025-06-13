import { Sound } from "../../interfaces/Sounds";
import alarmSound from "./stopwatch_alarm.mp3"; // Importa el archivo de sonido

const SoundsMap: Record<Sound, string> = {
	sound_not_found: "",
	StopwatchAlarm: alarmSound,
};

export default SoundsMap;
