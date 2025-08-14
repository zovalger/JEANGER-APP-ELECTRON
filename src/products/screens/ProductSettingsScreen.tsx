import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import RouterLinks from "../../common/config/RouterLinks";
import ProductSettingsForm from "../components/ProductSettingsForm";

const ProductSettingsScreen = () => {
	const { productSettings, getProductSettings } = useProduct();
	const navigate = useNavigate();

	useEffect(() => {
		getProductSettings().catch();
	}, []);

	return (
		<PageTemplateLayout
			name="Configuraciones de productos"
			backButtonURL={RouterLinks.Products}
			rightButtons={[]}
		>
			<div className="flex flex-col p-4">
				<ProductSettingsForm
					initialData={productSettings}
					successCallback={() => {
						navigate(RouterLinks.Products);
					}}
				/>
			</div>
		</PageTemplateLayout>
	);
};

export default ProductSettingsScreen;
