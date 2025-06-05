import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { CurrencyType, MathOperation } from "../enums";
import Input from "./Input";
import {
	initialCalculatorState,
	onSpecialKeyDownHanddle,
} from "../helpers/CalculatorHelper";

export interface CalculatorState {
	createAt: Date | string;
	textInput: string;
	a: number;
	b: number | null;
	mathOperation: MathOperation;
	result: number | null;
	currencyType: CurrencyType;
}

const Calculator = () => {
	const [idCalculator] = useState(uuid());
	const [calculatorState, setCalculatorState] = useState<CalculatorState>(
		initialCalculatorState()
	);

	const onChange = (text: string) => {
		setCalculatorState((prev) => ({ ...prev, textInput: text }));
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
				id={idCalculator}
				// type="number"
				placeholder="calcular"
				className="text-right"
				value={calculatorState.textInput}
				onChange={(event) => onChange(event.target.value)}
				onKeyDown={(event) => {
					if (
						event.key === MathOperation.sum ||
						event.key === MathOperation.subtract ||
						event.key === MathOperation.division ||
						event.key === MathOperation.multiply ||
						event.key === "Enter" ||
						event.key === "Escape" ||
						event.key === "$"
					) {
						event.preventDefault();
						onKeyPress(event.key, event.altKey, event.ctrlKey);
					}
				}}
			/>
		</>
	);
};

export default Calculator;
