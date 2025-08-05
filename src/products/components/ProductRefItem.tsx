import React from "react";
import { IProductReference } from "../interfaces";
import useProduct from "../hooks/useProduct";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";

interface props {
	data: IProductReference;
}

const ProductRefItem = ({ data }: props) => {
	const { _id, parentId, amount, percentage } = data;
	const { product, removeProductRef } = useProduct({ productId: parentId });

	if (!product) return <Text>Loanding</Text>;

	return (
		<div className="flex items-center gap-2 ">
			<IconButton
				icon="Trash"
				variant="danger"
				size="tiny"
				onClick={() => removeProductRef(_id)}
			/>
			<Text className="ml-2 mr-auto ">{product.name}</Text>
			<Text>{product.cost}</Text>
			<Text>x{amount}</Text>
			<Text>{percentage}%</Text>
		</div>
	);
};

export default ProductRefItem;
