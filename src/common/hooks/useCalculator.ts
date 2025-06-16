import { useState } from "react";
import {
	calculateResult,
	CalculatorState,
	HandleChangeCalculator,
	initialCalculatorState,
	MathOperation,
	MathSpecialKey,
	onChangeVisorText,
	onMathOperationKey,
	switchCurrencyType,
} from "../helpers/CalculatorHelper";
import useForeignExchange from "../../foreign_exchange/hooks/useForeignExchange";
import { CurrencyType } from "../enums";

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

	const setHistoryState = (calculatorState: CalculatorState) => {
		setCalculatorState(calculatorState);
	};

	const onSpecialKeyDownHanddle = ({
		calculatorState,
		foreignExchange,
		key,
	}: HandleChangeCalculator): [CalculatorState, CalculatorState?] => {
		try {
			if (
				key === MathSpecialKey.F7 ||
				key === MathSpecialKey.F8 ||
				key === MathSpecialKey.F9
			)
				return [
					switchCurrencyType({
						calculatorState,
						foreignExchange,
						toCurrencyType:
							key === MathSpecialKey.F7
								? CurrencyType.EUR
								: key === MathSpecialKey.F8
								? CurrencyType.USD
								: CurrencyType.BSF,
					}),
				];

			if (key === MathSpecialKey.Enter) {
				const result = calculateResult(calculatorState);
				return [result, result];
			}

			if (key === MathSpecialKey.Escape) {
				setHistory([]);
				return [initialCalculatorState(calculatorState)];
			}

			if (Object.values(MathOperation).includes(key as MathOperation))
				return onMathOperationKey(calculatorState, key as MathOperation);

			throw new Error("Bonton no especial no encontrado");
		} catch (error) {
			return [calculatorState];
		}
	};

	const onKeyPress = (
		key: string
		// , altKey: boolean, ctrlKey: boolean
	) => {
		const [newCalculatorState, toHistory] = onSpecialKeyDownHanddle({
			calculatorState,
			foreignExchange,
			key,
		});

		setCalculatorState(newCalculatorState);
		if (toHistory) setHistory((prev) => [...prev, toHistory]);
	};

	return { calculatorState, setHistoryState, history, onChange, onKeyPress };
};

export default useCalculator;
