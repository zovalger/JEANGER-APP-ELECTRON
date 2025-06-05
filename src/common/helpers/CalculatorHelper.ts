import { CalculatorState } from "../components/Calculator";
import { CurrencyType, MathOperation } from "../enums";

export const calculateResult = (data: CalculatorState): CalculatorState => {
	const result = eval(`${data.a}${data.mathOperation}${data.b}`);

	return { ...data, result };
};

export const getVisorDataFormated = (data: CalculatorState): string => {
	const { a, b, result } = data;

	let valueVisor = b === null ? "0" : b.toFixed(2).toString();

	if (a != null && b != null && result != null) {
		valueVisor = result.toFixed(2).toString();
	}

	return valueVisor;
};

export const getNumberByVisorData = (dataVisor: string): number => {
	const bFormated = dataVisor.trim().replaceAll(",", ".");

	const bValue = bFormated ? parseFloat(bFormated) : 0;

	return bValue;
};

export const onMathOperationKey = (
	data: CalculatorState,
	mathOperation: MathOperation
): CalculatorState => {
	const { a, b, result } = data;

	const currentState =
		a != null && b != null && result != null ? data : calculateResult(data);

	if (currentState.result === null) return;
	if (currentState.b === null) return;

	const newState: CalculatorState = {
		...currentState,
		a: currentState.result,
		mathOperation: mathOperation,
		b: null,
		result: null,
	};

	return newState;
};

export const initialCalculatorState = (): CalculatorState => {
	return {
		createAt: new Date(),
		textInput: "",
		a: 0,
		b: null,
		result: null,
		mathOperation: MathOperation.sum,
		currencyType: CurrencyType.BSF,
	};
};

export interface HandleChangeCalculator {
	calculatorState: CalculatorState;
	key: string;
	altKey: boolean;
	ctrlKey: boolean;
}

export const onSpecialKeyDownHanddle = ({
	calculatorState,
	key,
	altKey,
	ctrlKey,
}: HandleChangeCalculator): CalculatorState => {
	console.log(key, altKey, ctrlKey);

	if (key === "$") return; // switchCurrencyType();
	if (key === "Enter") return calculateResult(calculatorState);
	if (key === "Escape") return initialCalculatorState();

	if (
		key === MathOperation.sum ||
		key === MathOperation.subtract ||
		key === MathOperation.division ||
		key === MathOperation.multiply
	)
		return onMathOperationKey(calculatorState, key);
};
