import { Stopwatch } from "../interfaces/Stopwatch.interface";

export const startStopwatch = (data: Stopwatch): Stopwatch => {
	const { accumulatedTime: at, timeDate: td } = data;

	const timeDate = td ? td : at ? Date.now() - at : Date.now();
	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate, timeSeted: null };
};

export const pauseStopwatch = (data: Stopwatch): Stopwatch => {
	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : Date.now() - td;

	return { ...data, accumulatedTime, timeDate: null, timeSeted: null };
};

export const getTimeStopwatch = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? referenceTime - timeDate : accumulatedTime;
};

export function addZero(n: number) {
	n = Math.abs(n);

	return (n < 10 ? "0" : "") + n;
}

export function milisecondsToTime(
	s: number,
	op = {
		hrs: true,
		mins: true,
		secs: true,
		ms: true,
		msUnjoin: false,
		inObject: false,
	}
) {
	let ms = s % 1000;
	s = (s - ms) / 1000;
	const secs = s % 60;
	s = (s - secs) / 60;
	const mins = s % 60;
	const hrs = (s - mins) / 60;

	ms = Math.floor(ms / 10);

	return {
		time: hrs
			? addZero(hrs) + ":" + addZero(mins) + ":" + addZero(secs)
			: mins
			? addZero(mins) + ":" + addZero(secs)
			: addZero(secs),
		ms: "." + addZero(ms),
	};
}

export const startTimer = (data: Stopwatch): Stopwatch => {
	const { timeDate: td, accumulatedTime: at, timeSeted: ts } = data;

	if (ts == null) return data;

	const timeDate =
		!td && !at ? Date.now() + ts : td ? td : at ? Date.now() + at : Date.now();

	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate };
};

export const pauseTimer = (data: Stopwatch): Stopwatch => {
	// arreglar cuando el tiempo esta negativo

	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : td - Date.now();

	return { ...data, accumulatedTime, timeDate: null };
};

export const getTimeTimer = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? timeDate - referenceTime : accumulatedTime;
};

export const getTime = (
	clock: Stopwatch,
	referenceTime: number
): {
	format: { time: string; ms: string };
	time: number;
} => {
	const { timeSeted } = clock;

	const time =
		timeSeted !== null
			? getTimeTimer(clock, referenceTime)
			: getTimeStopwatch(clock, referenceTime);

	const format = milisecondsToTime(time);

	return { format, time };
};
