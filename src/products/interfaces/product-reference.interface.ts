export interface IProductReference {
	_id: string;
	parentId: string;
	childId: string;
	percentage: number;
	amount: number;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}
