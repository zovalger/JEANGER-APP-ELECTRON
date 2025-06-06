import { CurrencyType } from "../enums";

export interface CalculatorState {
	createAt: Date | string;
	textInput: string;
	a: number;
	b: number | null;
	mathOperation: MathOperation;
	result: number | null;
	currencyType: CurrencyType;
}

export enum MathOperation {
	sum = "+",
	subtract = "-",
	division = "/",
	multiply = "*",
}

export enum MathSpecialKey {
	Enter = "Enter",
	Escape = "Escape",
	$ = "$",
}

export interface HandleChangeCalculator {
	calculatorState: CalculatorState;
	key: string;
	altKey: boolean;
	ctrlKey: boolean;
}

// *****************************************************
//                    helpers
// *****************************************************

export const isSpeacialkey = (key: string): boolean => {
	if (Object.values(MathSpecialKey).includes(key as MathSpecialKey))
		return true;

	if (Object.values(MathOperation).includes(key as MathOperation)) return true;

	return false;
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

export const onChangeVisorText = (data: CalculatorState, text: string) => {
	const onlyNumberAndDots = text.replace(/[^0-9.,]/g, "").replace(/\./g, ",");

	const [number, decimal] = onlyNumberAndDots.split(",");

	let a = number;

	if (decimal !== undefined) a += `,${decimal}`;

	return { ...data, textInput: a };
};

// *****************************************************
//                    calculators
// *****************************************************

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

export const onSpecialKeyDownHanddle = ({
	calculatorState,
	key,
	altKey,
	ctrlKey,
}: HandleChangeCalculator): CalculatorState => {
	if (key === MathSpecialKey.$) return; // switchCurrencyType();
	if (key === MathSpecialKey.Enter) return calculateResult(calculatorState);
	if (key === MathSpecialKey.Escape) return initialCalculatorState();

	if (Object.values(MathOperation).includes(key as MathOperation))
		return onMathOperationKey(calculatorState, key as MathOperation);
};
