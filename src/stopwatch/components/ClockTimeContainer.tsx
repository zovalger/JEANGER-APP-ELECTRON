import Input from "../../common/components/Input";
import Text from "../../common/components/Text";
import { milisecondsToTime } from "../helpers/Stopwatch.helper";
import { Stopwatch } from "../interfaces/Stopwatch.interface";

interface props {
	data: Stopwatch;
	time: string;
	onChangeMinuteInput(minute: string): void;
	onStart(): void;
}
export default function ClockTimeContainer({
	data,
	time,
	onChangeMinuteInput,
	onStart,
}: props) {
	return (
		<div>
			{data.timeSeted !== null ? (
				!data.timeDate && !data.accumulatedTime ? (
					<Input
						placeholder="Minutos"
						name="name"
						value={data.timeSeted / 60000}
						type="number"
						onChange={(e) => {
							onChangeMinuteInput(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") onStart();
						}}
						autoComplete="none"
					/>
				) : (
					<>
						<Text>{milisecondsToTime(data.timeSeted).time}</Text>
						<Text>{time}</Text>
					</>
				)
			) : (
				<>
					<Text>{time}</Text>
				</>
			)}
		</div>
	);
}
