import Input from "./Input";
import useCalculator from "../hooks/useCalculator";
import { isSpeacialkey } from "../helpers/CalculatorHelper";

const Calculator = () => {
	const { calculatorState, onChange, onKeyPress } = useCalculator();

	const { mathOperation, a, b, textInput } = calculatorState;
	return (
		<>
			<div>
				{a}
				{mathOperation}
				{textInput}
			</div>
			<Input
				placeholder="calcular"
				className="text-right"
				value={textInput}
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
