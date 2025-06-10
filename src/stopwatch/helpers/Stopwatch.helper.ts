import { Stopwatch } from "../interfaces/Stopwatch.interface";

export const startStopwatch = (data: Stopwatch): Stopwatch => {
	const { accumulatedTime: at, timeDate: td } = data;

	const timeDate = td ? td : at ? Date.now() - at : Date.now();
	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate, timeSeted: null };
};

export const pauseStopwatch = (data: Stopwatch): Stopwatch => {
	// arreglar cuando el tiempo esta negativo

	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : Date.now() - td;

	return { ...data, accumulatedTime, timeDate: null, timeSeted: null };
};

export const getTimeStopwatch = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? referenceTime - timeDate : accumulatedTime;
};
