import { IForeignExchange } from "../../foreign_exchange/interfaces/ForeignExchange.interface";
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
	F7 = "F7", // euros
	F8 = "F8", // dolares
}

export interface HandleChangeCalculator {
	calculatorState: CalculatorState;
	foreignExchange: IForeignExchange;
	key: string;
	// altKey: boolean;
	// ctrlKey: boolean;
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

export const initialCalculatorState = (
	calculatorState?: CalculatorState
): CalculatorState => {
	return {
		createAt: new Date(),
		textInput: "",
		a: null,
		b: null,
		result: null,
		mathOperation: MathOperation.sum,
		currencyType: calculatorState?.currencyType || CurrencyType.BSF,
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

	if (a === null) throw new Error("Calculo no valido");

	const sB = b || getNumberFromTextInput(textInput);

	if (isNaN(sB)) return data;

	const result = eval(`${a}${mathOperation}${sB}`);

	return {
		...data,
		textInput: setNumberToTextInput(result),
		result,
		b: sB,
		createAt: new Date(),
	};
};

export const onMathOperationKey = (
	data: CalculatorState,
	mathOperation: MathOperation
): [CalculatorState, CalculatorState?] => {
	const { textInput, a, b, result } = data;

	if (!textInput.trim().length) return [{ ...data, mathOperation }];

	const newState = { ...data };

	const numTextInput = getNumberFromTextInput(textInput);

	if (a === null) {
		return [
			{
				...newState,
				a: numTextInput,
				textInput: "",
				mathOperation,
			},
		];
	}

	if (a !== null && b === null) {
		const n = calculateResult({
			...newState,
			b: numTextInput,
		});

		return [
			{
				...n,
				result: null,
				textInput: "",
				b: null,
				a: n.result,
				mathOperation,
			},
			n,
		];
	}

	if (a !== null && b !== null && result !== null) {
		return [
			{
				...newState,
				textInput: "",
				result: null,
				b: null,
				a: result,
				mathOperation,
			},
		];
	}

	return [{ ...newState, mathOperation }];
};

interface SwitchCurrencyType {
	calculatorState: CalculatorState;
	foreignExchange: IForeignExchange;
	toCurrencyType: CurrencyType;
}

const switchCurrencyType = ({
	calculatorState,
	foreignExchange,
	toCurrencyType,
}: SwitchCurrencyType): CalculatorState => {
	const { dolar, euro } = foreignExchange;

	const { a, b, result, textInput, currencyType } = calculatorState;

	const newState = {
		...calculatorState,
	};

	if (currencyType === toCurrencyType) {
		// desconvertir
		const divisaRef = currencyType === CurrencyType.USD ? dolar : euro;

		const t = getNumberFromTextInput(textInput);

		newState.a = a !== null ? a * divisaRef : null;
		newState.b = b !== null ? b * divisaRef : null;
		newState.result = result !== null ? result * divisaRef : null;
		newState.textInput =
			!isNaN(t) && t !== null ? setNumberToTextInput(t * divisaRef) : "0";
		newState.currencyType = CurrencyType.BSF;

		return newState;
	}

	const divisaToRevert =
		currencyType === CurrencyType.USD
			? dolar
			: currencyType === CurrencyType.EUR
			? euro
			: 1;

	const divisaToSet =
		toCurrencyType === CurrencyType.USD
			? dolar
			: toCurrencyType === CurrencyType.EUR
			? euro
			: 1;

	const convertTo = (n: number, from: number, to: number): number =>
		(n * from) / to;

	newState.a = a !== null ? convertTo(a, divisaToRevert, divisaToSet) : null;
	newState.b = b !== null ? convertTo(b, divisaToRevert, divisaToSet) : null;
	newState.result =
		result !== null ? convertTo(result, divisaToRevert, divisaToSet) : null;

	const t = getNumberFromTextInput(textInput);

	newState.textInput = !isNaN(t)
		? setNumberToTextInput(convertTo(t, divisaToRevert, divisaToSet))
		: "0";

	newState.currencyType =
		toCurrencyType == currencyType ? CurrencyType.BSF : toCurrencyType;

	return newState;
};

export const onSpecialKeyDownHanddle = ({
	calculatorState,
	foreignExchange,
	key,
}: HandleChangeCalculator): [CalculatorState, CalculatorState?] => {
	try {
		if (key === MathSpecialKey.F7 || key === MathSpecialKey.F8)
			return [
				switchCurrencyType({
					calculatorState,
					foreignExchange,
					toCurrencyType:
						key === MathSpecialKey.F7 ? CurrencyType.EUR : CurrencyType.USD,
				}),
			];

		if (key === MathSpecialKey.Enter) {
			const result = calculateResult(calculatorState);
			return [result, result];
		}

		if (key === MathSpecialKey.Escape)
			return [initialCalculatorState(calculatorState)];

		if (Object.values(MathOperation).includes(key as MathOperation))
			return onMathOperationKey(calculatorState, key as MathOperation);
	} catch (error) {
		return [calculatorState];
	}
};
