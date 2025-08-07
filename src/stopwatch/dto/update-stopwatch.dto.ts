import { CreateStopwatchDto } from "./create-stopwatch.dto";

export interface UpdateStopwatchDto extends Partial<CreateStopwatchDto> {
  _id: string;
	updatedAt: string;
}
