import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stopwatch } from "../../stopwatch/interfaces/Stopwatch.interface";

interface IStopwatchState {
	stopwatches: Stopwatch[];
}

interface IStopwatchActions {
	onSetAllStopwatches: (stopwatches: Stopwatch[]) => void;
	onSetStopwatch: (id: string, stopwatches: Stopwatch) => void;
	onRemoveStopwatch: (id: string) => void;
	onGetExpiredTimers: (referenceTime: number) => Stopwatch[];
}

interface IStopwatchStore extends IStopwatchState, IStopwatchActions {}

const useStopwatchStore = create<IStopwatchStore>()(
	persist<IStopwatchStore>(
		(set, get) => ({
			stopwatches: [],
			onSetAllStopwatches: (stopwatches) =>
				set((state) => ({ ...state, stopwatches })),

			onSetStopwatch: (id: string, stopwatch: Stopwatch) =>
				set((state) => {
					const { stopwatches } = state;

					const finded = stopwatches.find((item) => item._id === id);

					const newStopwatches = finded
						? stopwatches.map((item) => (item._id === id ? stopwatch : item))
						: [...stopwatches, stopwatch];

					return { ...state, stopwatches: newStopwatches };
				}),

			onRemoveStopwatch: (id: string) => {
				set((state) => {
					const { stopwatches } = state;

					const newStopwatches = stopwatches.filter((item) => item._id != id);

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
