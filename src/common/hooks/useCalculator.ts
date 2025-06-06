import { useState } from "react";
import {
	CalculatorState,
	initialCalculatorState,
	onChangeVisorText,
	onSpecialKeyDownHanddle,
} from "../helpers/CalculatorHelper";

const useCalculator = () => {
	const [calculatorState, setCalculatorState] = useState<CalculatorState>(
		initialCalculatorState()
	);

	const onChange = (text: string) => {
		const textInput = onChangeVisorText(text);
		setCalculatorState((prev) => ({ ...prev, textInput }));
	};

	const onKeyPress = (key: string, altKey: boolean, ctrlKey: boolean) => {
		const newCalculatorState = onSpecialKeyDownHanddle({
			calculatorState,
			key,
			altKey,
			ctrlKey,
		});

		console.log(newCalculatorState);

		setCalculatorState(newCalculatorState);
	};

	return { calculatorState, onChange, onKeyPress };
};

export default useCalculator;
