export interface IStopwatch {
	_id: string;
	tempId: string;
	name: string;
	timeDate: number | null;
	accumulatedTime: number;
	timeSeted: number | null;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}
