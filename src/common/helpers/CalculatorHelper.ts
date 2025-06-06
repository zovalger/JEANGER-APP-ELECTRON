import { CurrencyType } from "../enums";

export interface CalculatorState {
	createAt: Date | string;
	textInput: string;
	a: number | null;
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
		a: null,
		b: null,
		result: null,
		mathOperation: MathOperation.sum,
		currencyType: CurrencyType.BSF,
	};
};

export const onChangeVisorText = (text: string) => {
	const onlyNumberAndDots = text.replace(/[^0-9.,]/g, "").replace(/\./g, ",");

	const [number, decimal, ...others] = onlyNumberAndDots.split(",");

	let numberText = number;

	if (decimal !== undefined) numberText += `,${decimal}${others.join("")}`;

	return numberText;
};

// *****************************************************
//                    calculators
// *****************************************************

// export const getVisorDataFormated = (data: CalculatorState): string => {
// 	const { a, b, result } = data;

// 	let valueVisor = b === null ? "0" : b.toFixed(2).toString();

// 	if (a != null && b != null && result != null) {
// 		valueVisor = result.toFixed(2).toString();
// 	}

// 	return valueVisor;
// };

export const getNumberFromTextInput = (textInput: string): number => {
	return parseFloat(textInput.replace(",", "."));
};

export const setNumberToTextInput = (textInput: number): string => {
	return textInput.toString().replace(".", ",");
};

export const calculateResult = (data: CalculatorState): CalculatorState => {
	const { a, mathOperation, textInput } = data;

	if (a === null) return data;

	const currentB = getNumberFromTextInput(textInput);

	const result = eval(`${a}${mathOperation}${currentB}`);

	return { ...data, textInput: setNumberToTextInput(result), a: result };
};

export const onMathOperationKey = (
	data: CalculatorState,
	mathOperation: MathOperation
): CalculatorState => {
	const { textInput, a, b } = data;

	if (!textInput.trim().length) return data;

	const numTextInput = getNumberFromTextInput(textInput);

	console.log(textInput, numTextInput);

	const newState = { ...data, mathOperation };

	if (a === null) {
		newState.a = numTextInput;
		newState.textInput = "";
	}

	if (a !== null) {
		const n = calculateResult(newState);

		return { ...n, textInput: "" };
	}

	// if (a !== null) return calculateResult(newState);

	// const currentState =
	// 	a != null && b != null && result != null ? data : calculateResult(data);

	// if (currentState.result === null) return;
	// if (currentState.b === null) return;

	// const newStates: CalculatorState = {
	// 	...currentState,
	// 	a: currentState.result,
	// 	mathOperation: mathOperation,
	// 	b: null,
	// 	result: null,
	// };

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
