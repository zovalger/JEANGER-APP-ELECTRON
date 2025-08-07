import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import useProduct from "../hooks/useProduct";
import ProductForm from "../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import RouterLinks from "../../common/config/RouterLinks";

const ProductScreen = () => {
	const { id } = useParams();
	const { product } = useProduct({ productId: id });

	const navigate = useNavigate();

	return (
		<PageTemplateLayout
			name="Editar producto"
			nameHelp={product?.name}
			backButtonURL={RouterLinks.Products}
			rightButtons={[]}
		>
			<div className="flex flex-col p-4">
				{product && (
					<ProductForm
						initialData={product}
						successCallback={() => {
							navigate(RouterLinks.Products);
						}}
					/>
				)}
			</div>
		</PageTemplateLayout>
	);
};

export default ProductScreen;
