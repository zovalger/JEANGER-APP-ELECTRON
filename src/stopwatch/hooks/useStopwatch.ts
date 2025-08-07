import useStopwatchStore from "../../common/store/useStopwatchStore";
import {
	getTime,
	pauseStopwatch,
	pauseTimer,
	startStopwatch,
	startTimer,
} from "../helpers/Stopwatch.helper";
import { useStopwatchContext } from "../context/Stopwatch.context";
import useRequest from "../../common/hooks/useRequest";
import { StopwatchUrls } from "../api/stopwatch-url";
import { IStopwatch } from "../interfaces";
import { CreateStopwatchDto, UpdateStopwatchDto } from "../dto";

const useStopwatch = () => {
	const { jeangerApp_API } = useRequest();
	const stopwatchContext = useStopwatchContext();

	const stopwatches = useStopwatchStore((state) => state.stopwatches);
	const onSetAllStopwatches = useStopwatchStore(
		(state) => state.onSetAllStopwatches
	);
	const onSetStopwatch = useStopwatchStore((state) => state.onSetStopwatch);

	const onRemoveStopwatch = useStopwatchStore(
		(state) => state.onRemoveStopwatch
	);
	const onGetExpiredTimers = useStopwatchStore(
		(state) => state.onGetExpiredTimers
	);

	// ************************************************************
	// 										functions
	// ************************************************************

	const setStopwatch = (stopwatch: IStopwatch) => {
		// todo: ver si el que viene es mas nuevo que el que esta actualmente
		onSetStopwatch(stopwatch._id, stopwatch);
	};

	const createStopwatch = (data: CreateStopwatchDto) => {
		setStopwatch;
		if (stopwatchContext) stopwatchContext.sendCreateStopwatch(data);
	};

	const removeStopwatch = (id: string) => {
		// todo: ver si el que viene es mas nuevo que el que esta actualmente

		onRemoveStopwatch(id);

		if (stopwatchContext) stopwatchContext.sendDeleteStopwatch(id);
	};

	const getAllStopwatch = async () => {
		try {
			const { data } = await jeangerApp_API.get<IStopwatch[]>(
				StopwatchUrls.base()
			);

			onSetAllStopwatches(data);

			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const start = (stopwatch: IStopwatch) => {
		const { timeSeted } = stopwatch;

		const newStopwatch =
			timeSeted !== null ? startTimer(stopwatch) : startStopwatch(stopwatch);

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const pause = (stopwatch: IStopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (!timeDate) return;

		const newStopwatch =
			timeSeted !== null ? pauseTimer(stopwatch) : pauseStopwatch(stopwatch);

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const switchClock = (stopwatch: IStopwatch) => {
		const { timeSeted, timeDate } = stopwatch;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newStopwatch: IStopwatch = {
			...stopwatch,
			timeSeted: newSeted,
			accumulatedTime: 0,
			timeDate: null,
		};

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const restart = (stopwatch: IStopwatch) => {
		const newStopwatch: IStopwatch = {
			...stopwatch,
			accumulatedTime: 0,
			timeDate: null,
		};

		setStopwatch(newStopwatch);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newStopwatch);
	};

	const setTimeTo = (stopwatch: IStopwatch, minutes: string | number) => {
		const newTimeSeted = minutes
			? (typeof minutes == "string" ? parseInt(minutes) : minutes) * 60000
			: 0;

		const newT = { ...stopwatch, timeSeted: newTimeSeted };

		setStopwatch(newT);
		if (stopwatchContext) stopwatchContext.sendUpdateStopwatch(newT);
	};

	const getExpiredTimers = (referenceTime: number) =>
		onGetExpiredTimers(referenceTime);

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

		setTimeTo,
		createStopwatch,
		setStopwatch,
		removeStopwatch,
		getExpiredTimers,
	};
};

export default useStopwatch;
