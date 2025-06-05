import { useState } from "react";
import Input from "./Input";
import {
	CalculatorState,
	initialCalculatorState,
	isSpeacialkey,
	onChangeVisorText,
	onSpecialKeyDownHanddle,
} from "../helpers/CalculatorHelper";

const Calculator = () => {
	const [calculatorState, setCalculatorState] = useState<CalculatorState>(
		initialCalculatorState()
	);

	const onChange = (text: string) => {
		const newCalculatorState = onChangeVisorText(calculatorState, text);
		setCalculatorState(newCalculatorState);
	};

	const onKeyPress = (key: string, altKey: boolean, ctrlKey: boolean) => {
		const newCalculatorState = onSpecialKeyDownHanddle({
			calculatorState,
			key,
			altKey,
			ctrlKey,
		});

		setCalculatorState(newCalculatorState);
	};

	return (
		<>
			<Input
				placeholder="calcular"
				className="text-right"
				value={calculatorState.textInput}
				onChange={(event) => onChange(event.target.value)}
				onKeyDown={(event) => {
					if (isSpeacialkey(event.key)) {
						event.preventDefault();
						onKeyPress(event.key, event.altKey, event.ctrlKey);
					}
				}}
			/>
		</>
	);
};

export default Calculator;
