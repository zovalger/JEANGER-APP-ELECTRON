import { useNavigate } from "react-router-dom";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import ProductForm from "../components/ProductForm";
import RouterLinks from "../../common/config/RouterLinks";
import Modal from "../../common/components/Modal";
import Text from "../../common/components/Text";
import Button from "../../common/components/Button";
import { useState } from "react";

const NewProductScreen = () => {
	const navigate = useNavigate();

	const [prodId, setProdId] = useState<string | null>(null);

	return (
		<PageTemplateLayout
			name="Nuevo producto"
			rightButtons={[]}
			backButtonURL={RouterLinks.Products}
		>
			<div className="flex flex-col p-4">
				<ProductForm
					successCallback={(data) => {
						setProdId(data._id);
					}}
				/>
			</div>

			<Modal
				visible={!!prodId}
				onClose={() => {
					navigate(RouterLinks.Products);
				}}
			>
				<Text className="mb-4" size="big" variant="bold">
					Quieres seguir editando el producto?
				</Text>

				<div className="flex gap-2">
					<Button
						className="flex-1"
						onClick={() => {
							navigate(RouterLinks.ProductById(prodId));
						}}
						type="button"
					>
						Seguir editando
					</Button>

					<Button
						className="flex-1"
						onClick={() => {
							navigate(RouterLinks.Products);
						}}
						type="button"
					>
						No
					</Button>
				</div>
			</Modal>
		</PageTemplateLayout>
	);
};

export default NewProductScreen;
