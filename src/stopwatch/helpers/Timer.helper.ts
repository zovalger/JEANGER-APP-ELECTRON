import { Stopwatch } from "../interfaces/Stopwatch.interface";

export const startTimer = (data: Stopwatch) => {
	const { timeDate: td, accumulatedTime: at, timeSeted: ts } = data;

	if (ts == null) return data;

	const timeDate =
		!td && !at ? Date.now() + ts : td ? td : at ? Date.now() + at : Date.now();

	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate };
};

export const pauseTimer = (data: Stopwatch):Stopwatch => {
	// arreglar cuando el tiempo esta negativo

	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : td - Date.now();


	return { ...data, accumulatedTime, timeDate:null };
};

export const getTimeTimer = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? timeDate - referenceTime : accumulatedTime;
};
