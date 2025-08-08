import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IStopwatch } from "../../stopwatch/interfaces";

interface IStopwatchState {
	stopwatches: IStopwatch[];
}

interface IStopwatchActions {
	onSetAllStopwatches: (stopwatches: IStopwatch[]) => void;
	onSetStopwatch: (id: string, stopwatches: IStopwatch) => void;
	onRemoveStopwatch: (id: string) => void;
	onGetExpiredTimers: (referenceTime: number) => IStopwatch[];
}

interface IStopwatchStore extends IStopwatchState, IStopwatchActions {}

const useStopwatchStore = create<IStopwatchStore>()(
	persist<IStopwatchStore>(
		(set, get) => ({
			stopwatches: [],
			onSetAllStopwatches: (stopwatches) =>
				set((state) => ({ ...state, stopwatches })),

			onSetStopwatch: (id: string, stopwatch: IStopwatch) =>
				set((state) => {
					const { stopwatches } = state;

					const finded = stopwatches.find(
						(item) => item._id === id || item.tempId === id
					);

					const newData = finded
						? stopwatches.map((item) =>
								item._id === id || item.tempId === id ? stopwatch : item
						  )
						: [...stopwatches, stopwatch];

					return { ...state, stopwatches: newData };
				}),

			onRemoveStopwatch: (id: string) => {
				set((state) => {
					const { stopwatches } = state;

					const newStopwatches = stopwatches.filter(
						(item) => item._id != id && item.tempId != id
					);

					return {
						...state,
						stopwatches: newStopwatches,
					};
				});
			},

			onGetExpiredTimers: (referenceTime) =>
				get().stopwatches.filter(
					(item) =>
						item.timeSeted !== null &&
						item.timeDate &&
						item.timeDate < referenceTime
				),
		}),
		{ name: "stopwatch-store" }
	)
);

export default useStopwatchStore;
