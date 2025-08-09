import { v4 as uuid } from "uuid";

import useStopwatchStore from "../../common/store/useStopwatchStore";

import { useStopwatchContext } from "../context/Stopwatch.context";
import useRequest from "../../common/hooks/useRequest";
import { StopwatchUrls } from "../api/stopwatch-url";
import { IStopwatch } from "../interfaces";
import {
	CreateStopwatchDto,
	RemoveStopwatchDto,
	UpdateStopwatchDto,
} from "../dto";
import {
	getTime,
	pauseStopwatch,
	pauseTimer,
	startStopwatch,
	startTimer,
} from "../helpers/Stopwatch.helper";

interface Options {
	stopwatchId?: string;
}

const useStopwatch = (options?: Options) => {
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
	const onGetStopwatch = useStopwatchStore((state) => state.onGetStopwatch);

	// ************************************************************
	// 										functions
	// ************************************************************
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

	const getStopwatch = async (id: string) => {
		try {
			const data = onGetStopwatch(id);

			if (!data) throw new Error("no encontrado");

			return data;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	const setStopwatch = async (stopwatch: IStopwatch, disableSync = false) => {
		const { _id, tempId, updatedAt } = stopwatch;

		try {
			const t = await getStopwatch(tempId || _id);

			if (disableSync)
				if (new Date(updatedAt).getTime() < new Date(t.updatedAt).getTime())
					return;
		} catch (error) {
			console.log(error);
		}

		const newStopwatch = { ...stopwatch };

		onSetStopwatch(tempId || _id, newStopwatch);

		if (!disableSync && stopwatchContext) {
			if (newStopwatch._id) stopwatchContext.sendUpdateStopwatch(newStopwatch);
			else stopwatchContext.sendCreateStopwatch(newStopwatch);
		}

		return newStopwatch;
	};

	const removeStopwatch = async (
		removeStopwatchDto: RemoveStopwatchDto,
		disableSync = false
	) => {
		const { _id, updatedAt } = removeStopwatchDto;

		const t = await getStopwatch(_id);

		if (new Date(updatedAt).getTime() < new Date(t.updatedAt).getTime()) return;

		onRemoveStopwatch(_id);

		if (stopwatchContext && !disableSync)
			stopwatchContext.sendDeleteStopwatch(removeStopwatchDto);
	};

	const createStopwatch = async (data: CreateStopwatchDto) => {
		const id = uuid();

		const n = new Date().toString();

		const toSave = {
			...data,
			tempId: uuid(),
			createdAt: n,
			updatedAt: n,
		};

		onSetStopwatch(id, { ...toSave, _id: "" });

		if (stopwatchContext) stopwatchContext.sendCreateStopwatch(toSave);

		return toSave;
	};

	const updateStopwatch = async (data: UpdateStopwatchDto) => {
		const t = await getStopwatch(data._id || data.tempId);

		return await setStopwatch({
			...t,
			...data,
			updatedAt: new Date().toString(),
		});
	};

	const start = async (id: string) => {
		const t = await getStopwatch(id);

		const { timeSeted } = t;
		const newStopwatch = timeSeted !== null ? startTimer(t) : startStopwatch(t);

		return await setStopwatch({
			...newStopwatch,
			updatedAt: new Date().toString(),
		});
	};

	const pause = async (id: string) => {
		const t = await getStopwatch(id);
		const { timeSeted, timeDate } = t;

		if (!timeDate) return;

		const newStopwatch = timeSeted !== null ? pauseTimer(t) : pauseStopwatch(t);

		return await setStopwatch({
			...newStopwatch,
			updatedAt: new Date().toString(),
		});
	};

	const switchClock = async (id: string) => {
		const t = await getStopwatch(id);
		const { timeSeted, timeDate } = t;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newStopwatch: IStopwatch = {
			...t,
			timeSeted: newSeted,
			accumulatedTime: 0,
			timeDate: null,
			updatedAt: new Date().toString(),
		};

		return await setStopwatch(newStopwatch);
	};

	const restart = async (id: string) => {
		const t = await getStopwatch(id);

		const newStopwatch: IStopwatch = {
			...t,
			accumulatedTime: 0,
			timeDate: null,
			updatedAt: new Date().toString(),
		};

		return await setStopwatch(newStopwatch);
	};

	const setTimeTo = async (id: string, minutes: string | number) => {
		const t = await getStopwatch(id);

		const newTimeSeted = minutes
			? (typeof minutes == "string" ? parseInt(minutes) : minutes) * 60000
			: 0;

		const newT = {
			...t,
			timeSeted: newTimeSeted,
			updatedAt: new Date().toString(),
		};

		return await setStopwatch(newT, true);
	};

	const getExpiredTimers = (referenceTime: number) =>
		onGetExpiredTimers(referenceTime);

	return {
		stopwatches,
		referenceTime: stopwatchContext
			? stopwatchContext.referenceTime
			: Date.now(),

		getAllStopwatch,
		getStopwatch,

		createStopwatch,
		updateStopwatch,
		removeStopwatch,
		setStopwatch,

		getTime,
		start,
		pause,
		switchClock,
		restart,
		setTimeTo,
		getExpiredTimers,
	};
};

export default useStopwatch;
