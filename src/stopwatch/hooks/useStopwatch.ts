import { useEffect, useState } from "react";
import useStopwatchStore from "../../common/store/useStopwatchStore";
import { getAllStopwatchRequest } from "../api/Stopwatch.api";
import {
	getTime,
	pauseStopwatch,
	pauseTimer,
	startStopwatch,
	startTimer,
} from "../helpers/Stopwatch.helper";
import { Stopwatch } from "../interfaces/Stopwatch.interface";

const useStopwatch = () => {
	const stopwatches = useStopwatchStore((state) => state.stopwatches);
	const onSetStopwatch = useStopwatchStore((state) => state.onSetStopwatch);

	// todo: quitar time reference
	const [referenceTime, setReferenceTime] = useState(Date.now());

	useEffect(() => {
		setInterval(() => {
			const time = Date.now();

			setReferenceTime(time);
		}, 1000);
	}, []);

	const getAllStopwatch = async () => {
		try {
			const data = await getAllStopwatchRequest();

			onSetStopwatch(data);
		} catch (error) {
			console.log(error);
		}
	};

	const start = (stopwatch: Stopwatch) => {
		const { timeSeted } = stopwatch;

		const newTimer =
			timeSeted !== null ? startTimer(stopwatch) : startStopwatch(stopwatch);

		// todo: setear en el array
		// todo: enviar por socket
		// setClock(newTimer);
		// sendUpdateStopwatch(newTimer);
	};

	const pause = (stopwatch: Stopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (!timeDate) return;

		const newTimer =
			timeSeted !== null ? pauseTimer(stopwatch) : pauseStopwatch(stopwatch);

		// todo: setear en el array
		// todo: enviar por socket
		// setClock(newTimer);
		// sendUpdateStopwatch(newTimer);
	};

	const switchClock = (stopwatch: Stopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newClock: Stopwatch = {
			...stopwatch,
			timeSeted: newSeted,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		// setClock(newClock);
		// sendUpdateStopwatch(newClock);
	};

	const restart = (stopwatch: Stopwatch) => {
		const newTimer: Stopwatch = {
			...stopwatch,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		// setClock(newTimer);
		// sendUpdateStopwatch(newTimer);
	};

	return {
		stopwatches,
		getAllStopwatch,
		getTime,
		start,
		pause,
		switchClock,
		restart,
		referenceTime
	};
};

export default useStopwatch;
