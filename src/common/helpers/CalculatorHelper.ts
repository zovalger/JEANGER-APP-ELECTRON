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

export const getNumberFromTextInput = (textInput: string): number => {
	return parseFloat(textInput.replace(",", "."));
};

export const setNumberToTextInput = (textInput: number): string => {
	return textInput.toString().replace(".", ",");
};

export const calculateResult = (data: CalculatorState): CalculatorState => {
	const { a, b, mathOperation, textInput } = data;

	if (a === null) return data;

	const sB = b || getNumberFromTextInput(textInput);

	if (isNaN(sB)) return data;

	const result = eval(`${a}${mathOperation}${sB}`);

	return { ...data, textInput: setNumberToTextInput(result), result, b: sB };
};

export const onMathOperationKey = (
	data: CalculatorState,
	mathOperation: MathOperation
): CalculatorState => {
	const { textInput, a, b, result } = data;

	if (!textInput.trim().length) return { ...data, mathOperation };

	const newState = { ...data };

	const numTextInput = getNumberFromTextInput(textInput);

	if (a === null) {
		return {
			...newState,
			a: numTextInput,
			textInput: "",
			mathOperation,
		};
	}
	if (a !== null && b === null) {
		const n = calculateResult({
			...newState,
			b: numTextInput,
		});

		return {
			...n,
			result: null,
			textInput: "",
			b: null,
			a: n.result,
			mathOperation,
		};
	}

	if (a !== null && b !== null && result !== null) {
		return {
			...newState,
			textInput: "",
			result: null,
			b: null,
			a: result,
			mathOperation,
		};
	}

	return { ...newState, mathOperation };
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
