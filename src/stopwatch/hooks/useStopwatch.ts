import { useState } from "react";
import { Stopwatch } from "../interfaces/Stopwatch.interface";

const useStopwatch = () => {
	const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

	return { stopwatches };
};

export default useStopwatch;
