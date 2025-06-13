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
import { useStopwatchContext } from "../context/Stopwatch.context";

const useStopwatch = () => {
	const stopwatchContext = useStopwatchContext();

	const stopwatches = useStopwatchStore((state) => state.stopwatches);
	const onSetAllStopwatches = useStopwatchStore(
		(state) => state.onSetAllStopwatches
	);
	const onSetStopwatch = useStopwatchStore((state) => state.onSetStopwatch);

	const onRemoveStopwatch = useStopwatchStore(
		(state) => state.onRemoveStopwatch
	);

	// ************************************************************
	// 										functions
	// ************************************************************

	const setStopwatch = (stopwatch: Stopwatch) =>
		onSetStopwatch(stopwatch._id, stopwatch);

	const removeStopwatch = (id: string) => onRemoveStopwatch(id);

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

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const pause = (stopwatch: Stopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (!timeDate) return;

		const newStopwatch =
			timeSeted !== null ? pauseTimer(stopwatch) : pauseStopwatch(stopwatch);

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
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

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const restart = (stopwatch: Stopwatch) => {
		const newStopwatch: Stopwatch = {
			...stopwatch,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const setTimeTo = (stopwatch: Stopwatch, minutes: string | number) => {
		const newTimeSeted = minutes
			? (typeof minutes == "string" ? parseInt(minutes) : minutes) * 60000
			: 0;

		const newT = { ...stopwatch, timeSeted: newTimeSeted };

		setStopwatch(newT);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newT);
	};

	const remove = (id: string) => {
		removeStopwatch(id);
		if (stopwatchContext) stopwatchContext.sendDeleteStopwatch(id);
	};

	return {
		stopwatches,
		referenceTime: stopwatchContext
			? stopwatchContext.referenceTime
			: Date.now(),

		getAllStopwatch,
		getTime,
		start,
		pause,
		switchClock,
		restart,
		remove,
		setTimeTo,

		// without socket
		setStopwatch,
		removeStopwatch,
	};
};

export default useStopwatch;
