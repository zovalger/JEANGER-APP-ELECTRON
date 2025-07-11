import Input from "./Input";
import useCalculator from "../hooks/useCalculator";
import {
	isSpeacialkey,
	MathOperation,
	MathSpecialKey,
} from "../helpers/CalculatorHelper";
import Text from "./Text";
import { useEffect, useRef } from "react";
import { CurrencyType } from "../enums";
import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";

const numbers = [
	{ title: CurrencyType.EUR, helpText: "F7", action: MathSpecialKey.F7 },
	{ title: CurrencyType.USD, helpText: "F8", action: MathSpecialKey.F8 },
	{ title: CurrencyType.BSF, helpText: "F9", action: MathSpecialKey.F9 },
	{ title: "/", action: MathOperation.division },
	{ title: "7" },
	{ title: "8" },
	{ title: "9" },
	{ title: "*", action: MathOperation.multiply },
	{ title: "4" },
	{ title: "5" },
	{ title: "6" },
	{ title: "-", action: MathOperation.subtract },
	{ title: "1" },
	{ title: "2" },
	{ title: "3" },
	{ title: "+", action: MathOperation.sum },
	{ title: "Borrar", action: MathSpecialKey.Escape },
	{ title: "0" },
	{ title: "," },
	{ title: "Enter", action: MathSpecialKey.Enter },
];

const Calculator = () => {
	const { calculatorState, history, setHistoryState, onChange, onKeyPress } =
		useCalculator();

	const { textInput, a, b, mathOperation, result, currencyType } =
		calculatorState;

	const historyRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (!historyRef.current) return;

		historyRef.current.scrollTo({ top: historyRef.current.scrollHeight });
	}, [history]);

	useEffect(() => {
		const focusInput = (e: KeyboardEvent) => {
			if (
				(e.key === MathSpecialKey.F7 ||
					e.key === MathSpecialKey.F8 ||
					e.key === MathSpecialKey.F9) &&
				inputRef.current
			) {
				inputRef.current.focus();
				onKeyPress(e.key);
			}
		};

		document.addEventListener("keydown", focusInput);

		return () => document.removeEventListener("keydown", focusInput);
	}, []);

	const calculatorColor =
		currencyType === CurrencyType.USD
			? "bg-dolar-translucent"
			: currencyType === CurrencyType.EUR
			? "bg-euro-translucent"
			: "";

	const platForm = Capacitor.getPlatform();

	const Content = (
		<div className={`p-4 hover:outline-2 ${calculatorColor}`}>
			<div ref={historyRef} className="h-20 overflow-y-scroll">
				{history.map((item) => (
					<div
						className="flex justify-end p-1 gap-2 hover:bg-gray-200 "
						key={new Date(item.createAt).getMilliseconds()}
						onClick={() => {
							setHistoryState(item);
						}}
					>
						<Text>
							{item.a?.toFixed(2)}
							{item?.mathOperation}
							{item.b?.toFixed(2)}={item.result?.toFixed(2)}
						</Text>
						<Text>{item.currencyType}</Text>
					</div>
				))}
			</div>
			<div className="gap-4">
				{a ? (
					<Text className="text-right" selectable={true}>
						{a.toFixed(2).replace(".", ",")}
						{mathOperation}
						{b?.toFixed(2).replace(".", ",")}
						{result && "="}
					</Text>
				) : (
					<Text className="text-right"> =</Text>
				)}

				<Input
					ref={inputRef}
					inputVariant="border-bottom"
					id={calculatorState.createAt.toString()}
					placeholder="calcular"
					className="text-right"
					value={textInput}
					textSize="big"
					onChange={(event) => onChange(event.target.value)}
					onFocus={() => {
						if (platForm === "android") Keyboard.hide();
					}}
					onKeyDown={(event) => {
						if (isSpeacialkey(event.key)) {
							event.preventDefault();
							onKeyPress(event.key);
						}
					}}
				/>
			</div>

			<div className="flex flex-wrap mt-1">
				{numbers.map((item) => (
					<div
						key={item.title}
						onClick={() => {
							console.log(inputRef);
							if (inputRef?.current) {
								inputRef.current.focus();
							}
							if (item.action) return onKeyPress(item.action);
							onChange(textInput + item.title);
						}}
						className={`flex-1/4 flex flex-col justify-center min-h-14 sm:min-h-8 rounded hover:bg-gray-200 p-1 ${
							item.title === currencyType && "bg-white"
						}`}
					>
						<Text size="small" className="text-center">
							{item.title}
						</Text>

						<Text size="tiny" className="text-center">
							{item?.helpText}
						</Text>
					</div>
				))}
			</div>
		</div>
	);

	return platForm === "android" ? (
		<div>{Content}</div>
	) : (
		<label htmlFor={calculatorState.createAt.toString()}>{Content}</label>
	);
};

export default Calculator;
