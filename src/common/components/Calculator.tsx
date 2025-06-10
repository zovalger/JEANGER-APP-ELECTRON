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

const numbers = [
	{ title: CurrencyType.EUR, action: MathSpecialKey.F7 },
	{ title: CurrencyType.USD, action: MathSpecialKey.F8 },
	{ title: CurrencyType.BSF, action: MathSpecialKey.F9 },
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

	useEffect(() => {
		if (!historyRef.current) return;

		historyRef.current.scrollTo({ top: historyRef.current.scrollHeight });
	}, [history]);

	return (
		<div className="border-t ">
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

			<div className="flex items-center justify-between gap-4 px-4">
				<Text>{currencyType}</Text>
				<div className="flex flex-col flex-1">
					{a && (
						<Text className="text-right" variant="bold" size="big">
							{a.toFixed(2).replace(".", ",")}
							{mathOperation}
							{b?.toFixed(2).replace(".", ",")}
							{result && "="}
						</Text>
					)}

					<Input
						placeholder="calcular"
						className="text-right"
						value={textInput}
						textSize="big"
						onChange={(event) => onChange(event.target.value)}
						onKeyDown={(event) => {
							if (isSpeacialkey(event.key)) {
								event.preventDefault();
								onKeyPress(event.key);
							}
						}}
					/>
				</div>
			</div>

			<div className="flex flex-wrap mt-1">
				{numbers.map((item) => (
					<Text
						key={item.title}
						className={`flex-1/4 p-2 hover:bg-gray-200 text-center ${
							item.title === currencyType && "bg-green-200"
						}`}
						onClick={() => {
							if (item.action) return onKeyPress(item.action);
							onChange(textInput + item.title);
						}}
					>
						{item.title}
					</Text>
				))}
			</div>
		</div>
	);
};

export default Calculator;
