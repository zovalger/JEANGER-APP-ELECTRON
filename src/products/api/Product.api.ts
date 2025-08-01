import { IProduct } from "../interfaces/product.interface";
import jeangerApp_API from "../../common/config/HttpClient";

const url = `/product`;

// *******************************************************************
// 													IProductos
// *******************************************************************

// ***************** consultas	*****************


export const getIProductRequest = async (id: string): Promise<IProduct> =>
	(await jeangerApp_API.get(`${url}/${id}`)).data;
	
export const getAllIProductsRequest = async (): Promise<IProduct[]> =>
	(await jeangerApp_API.get(`${url}`)).data;

// ***************** modificaciones	*****************

export const createIProductRequest = async (data: IProduct): Promise<IProduct> =>
	(await jeangerApp_API.post(url, data)).data;

export const updateIProductRequest = async (
	id: string,
	data: IProduct
): Promise<IProduct> => (await jeangerApp_API.put(`${url}/${id}`, data)).data;

export const deleteIProductRequest = async (id: string): Promise<boolean> =>
	(await jeangerApp_API.delete(`${url}/${id}`)).data;

// *******************************************************************
// 													Referencias
// *******************************************************************

// ***************** consultas referencias	*****************

// export const getIProductsReferences_by_IProductChild_Request = async (
// 	IProductId: string
// ): Promise<IProductReference[]> =>
// 	(await jeangerApp_API.get(`${url}/${IProductId}/reference`)).data;

// export const getPosibleIProductParents_by_IProductId_Request = async (
// 	IProductId: string
// ): Promise<string[]> =>
// 	(await jeangerApp_API.get(`${url}/${IProductId}/reference/to_parent`)).data;


// // ***************** modificaciones	 Referencias *****************

// export const createUpdateIProductsReference_Request = async (
// 	data: IProductReference
// ): Promise<IProductReference> =>
// 	(await jeangerApp_API.post(`${url}/reference/${data.parentId}/${data.childId}`, data))
// 		.data;

// export const deleteIProductsReference_Request = async (
// 	parentId: string,
// 	childId: string
// ): Promise<IProductReference> =>
// 	(await jeangerApp_API.delete(`${url}/reference/${parentId}/${childId}`)).data;
