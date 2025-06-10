import { Box, Typography, TextField } from "@mui/material";

import { Stopwatch } from "@/types";
import { milisecondsToTime } from "@/utils/milisecondsToTime";

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
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				minHeight: "65px",
			}}
		>
			{data.timeSeted !== null ? (
				!data.timeDate && !data.accumulatedTime ? (
					<TextField
						placeholder="Minutos"
						variant="standard"
						name="name"
						value={data.timeSeted / 60000}
						type="number"
						// sx={{ px: "1rem" }}
						onChange={(e) => {
							onChangeMinuteInput(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") onStart()
						}}
						inputProps={{
							style: {
								fontSize: "1.3rem",
								textAlign: "center",
								// maxWidth: "250px",
							},
						}}
						autoComplete="none"
					/>
				) : (
					<>
						<Typography>{milisecondsToTime(data.timeSeted).time}</Typography>
						<Typography variant="h4" component={"p"}>
							{time}
						</Typography>
					</>
				)
			) : (
				<>
					<Typography variant="h4" component={"p"}>
						{time}
					</Typography>
				</>
			)}
		</Box>
	);
}
