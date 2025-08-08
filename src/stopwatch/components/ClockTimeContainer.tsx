import Input from "../../common/components/Input";
import Text from "../../common/components/Text";
import { milisecondsToTime } from "../helpers/Stopwatch.helper";
import { IStopwatch } from "../interfaces";

interface props {
	data: IStopwatch;
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
		<div className="flex-1 flex flex-col items-center justify-center">
			{data.timeSeted !== null ? (
				!data.timeDate && !data.accumulatedTime ? (
					<Input
						textSize="big"
						className="text-center"
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
						<Text size="big">{time}</Text>
					</>
				)
			) : (
				<Text size="big">{time}</Text>
			)}
		</div>
	);
}
