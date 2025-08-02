import Input from "../../common/components/Input";

const ProductSearch = () => {
	return (
		<div className="sticky top-14 p-4 backdrop-blur-sm bg-[#fff9]">
			<div className="">
				<Input
					placeholder="Buscar producto"
					className="w-full"
					onChange={(e) => console.log(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default ProductSearch;
