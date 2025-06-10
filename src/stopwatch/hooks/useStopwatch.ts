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
	const onSetAllStopwatches = useStopwatchStore(
		(state) => state.onSetAllStopwatches
	);
	const onSetStopwatch = useStopwatchStore((state) => state.onSetStopwatch);

	const onRemoveStopwatch = useStopwatchStore(
		(state) => state.onRemoveStopwatch
	);

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

			onSetAllStopwatches(data);
		} catch (error) {
			console.log(error);
		}
	};

	const start = (stopwatch: Stopwatch) => {
		const { timeSeted } = stopwatch;

		const newStopwatch =
			timeSeted !== null ? startTimer(stopwatch) : startStopwatch(stopwatch);

		onSetStopwatch(newStopwatch._id, newStopwatch);

		// todo: enviar por socket
		// sendUpdateStopwatch(newStopwatch);
	};

	const pause = (stopwatch: Stopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (!timeDate) return;

		const newStopwatch =
			timeSeted !== null ? pauseTimer(stopwatch) : pauseStopwatch(stopwatch);

		onSetStopwatch(newStopwatch._id, newStopwatch);
		// todo: enviar por socket
		// setClock(newStopwatch);
		// sendUpdateStopwatch(newStopwatch);
	};

	const switchClock = (stopwatch: Stopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newStopwatch: Stopwatch = {
			...stopwatch,
			timeSeted: newSeted,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		onSetStopwatch(newStopwatch._id, newStopwatch);
		// sendUpdateStopwatch(newClock);
	};

	const restart = (stopwatch: Stopwatch) => {
		const newStopwatch: Stopwatch = {
			...stopwatch,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		onSetStopwatch(newStopwatch._id, newStopwatch);
		// sendUpdateStopwatch(newStopwatch);
	};

	const remove = (id: string) => {
		onRemoveStopwatch(id);
		// sendUpdateStopwatch(newStopwatch);
	};

	const setTimeTo = (stopwatch: Stopwatch, minutes: string | number) => {
		const newTimeSeted = minutes
			? (typeof minutes == "string" ? parseInt(minutes) : minutes) * 60000
			: 0;

		const newT = { ...stopwatch, timeSeted: newTimeSeted };

		onSetStopwatch(newT._id, newT);

		// todo: enviar por socket
		// sendUpdateStopwatch(newStopwatch);
	};
	return {
		stopwatches,
		getAllStopwatch,
		getTime,
		start,
		pause,
		switchClock,
		restart,
		remove,
		setTimeTo,
		referenceTime,
	};
};

export default useStopwatch;
