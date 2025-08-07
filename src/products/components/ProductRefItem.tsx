import React from "react";
import { IProductReference } from "../interfaces";
import useProduct from "../hooks/useProduct";
import Text from "../../common/components/Text";
import IconButton from "../../common/components/IconButton";

interface props {
	data: IProductReference;
	callback?: () => void;
}

const ProductRefItem = ({ data, callback }: props) => {
	const { _id, parentId, amount, percentage } = data;
	const { product, removeProductRef } = useProduct({ productId: parentId });

	if (!product) return <Text>Loanding</Text>;

	return (
		<div className="flex items-center gap-2 py-2 ">
			<IconButton
				icon="Trash"
				variant="danger"
				size="small"
				onClick={async () => {
					try {
						await removeProductRef(_id);
						if (callback) callback();
					} catch (error) {
						console.log(error);
					}
				}}
			/>
			<Text className="ml-2 mr-auto ">{product.name}</Text>
			<Text>
				{product.cost} {product.currencyType}
			</Text>
			<Text>x{amount}</Text>
			<Text>{percentage * 100}%</Text>
		</div>
	);
};

export default ProductRefItem;
