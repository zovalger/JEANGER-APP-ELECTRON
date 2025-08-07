import { useNavigate } from "react-router-dom";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import ProductForm from "../components/ProductForm";
import RouterLinks from "../../common/config/RouterLinks";

const NewProductScreen = () => {
	const navigate = useNavigate();

	return (
		<PageTemplateLayout
			name="Nuevo producto"
			rightButtons={[]}
			backButtonURL={RouterLinks.Products}
		>
			<div className="flex flex-col p-4">
				<ProductForm
					successCallback={(data) => {
						navigate(RouterLinks.ProductById(data._id));
					}}
				/>
			</div>
		</PageTemplateLayout>
	);
};

export default NewProductScreen;
