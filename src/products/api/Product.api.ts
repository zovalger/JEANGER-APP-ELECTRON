import { IProduct } from "../interfaces/product.interface";
import jeangerApp_API from "../../common/config/HttpClient";

const url = `/product`;

// *******************************************************************
// 													IProductos
// *******************************************************************

// ***************** consultas	*****************


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
