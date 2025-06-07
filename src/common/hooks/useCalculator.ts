import { useState } from "react";
import {
	CalculatorState,
	initialCalculatorState,
	onChangeVisorText,
	onSpecialKeyDownHanddle,
} from "../helpers/CalculatorHelper";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";

const useCalculator = () => {
	const { foreignExchange } = useForeignExchange();
	const [calculatorState, setCalculatorState] = useState<CalculatorState>(
		initialCalculatorState()
	);
	const [history, setHistory] = useState<CalculatorState[]>([]);

	const onChange = (text: string) => {
		const textInput = onChangeVisorText(text);
		setCalculatorState((prev) => ({
			...prev,
			textInput,
		}));
	};

	const onKeyPress = (
		key: string
		// , altKey: boolean, ctrlKey: boolean
	) => {
		const [newCalculatorState, toHistory] = onSpecialKeyDownHanddle({
			calculatorState,
			foreignExchange,
			key,
			// altKey,
			// ctrlKey,
		});

		setCalculatorState(newCalculatorState);
		if (toHistory) setHistory((prev) => [...prev, toHistory]);
	};

	const setHistoryState = (calculatorState: CalculatorState) => {
		setCalculatorState(calculatorState);
	};

	return { calculatorState, setHistoryState, history, onChange, onKeyPress };
};

export default useCalculator;
