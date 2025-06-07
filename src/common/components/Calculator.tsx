import Input from "./Input";
import useCalculator from "../hooks/useCalculator";
import { isSpeacialkey } from "../helpers/CalculatorHelper";
import Text from "./Text";
import { useEffect, useRef } from "react";

const Calculator = () => {
	const { calculatorState, history, onChange, onKeyPress } = useCalculator();
	const { textInput, a, b, mathOperation, result, currencyType } =
		calculatorState;

	const historyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!historyRef.current) return;

		historyRef.current.scrollTo({ top: historyRef.current.scrollHeight });
	}, [history]);

	return (
		<>
			<div ref={historyRef} className=" max-h-20 overflow-y-scroll">
				{history.map((item) => (
					<Text
						className="text-right p-1"
						key={new Date(item.createAt).getMilliseconds()}
					>
						{item.a.toFixed(2)}
						{item.mathOperation}
						{item.b.toFixed(2)}={item.result.toFixed(2)}
					</Text>
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
							console.log(event.key);

							if (isSpeacialkey(event.key)) {
								event.preventDefault();
								onKeyPress(event.key, event.altKey, event.ctrlKey);
							}
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Calculator;
