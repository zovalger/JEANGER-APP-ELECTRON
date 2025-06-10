import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stopwatch } from "../../stopwatch/interfaces/Stopwatch.interface";

interface IStopwatchState {
	stopwatches: Stopwatch[];
}

interface IStopwatchActions {
	onSetStopwatch: (stopwatches: Stopwatch[]) => void;
}

interface IStopwatchStore extends IStopwatchState, IStopwatchActions {}

const useStopwatchStore = create<IStopwatchStore>()(
	persist<IStopwatchStore>(
		(set) => ({
			stopwatches: [],
			onSetStopwatch: (stopwatches) =>
				set((state) => ({ ...state, stopwatches })),
		}),
		{ name: "stopwatch-store" }
	)
);

export default useStopwatchStore;
