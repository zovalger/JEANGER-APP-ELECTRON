import Button from "../../common/components/Button";
import IconButton from "../../common/components/IconButton";
import Input from "../../common/components/Input";
import Text from "../../common/components/Text";
import { Crop } from "../helpers/ImageEditor.helper";

interface props {
	crop: Crop;
	setCrop(crop: Crop): void;
}
const CropForm = (props: props) => {
	const { crop, setCrop } = props;

	const { x, y, offsetX, offsetY } = crop;

	const handleChange = (a: Partial<Crop>) => setCrop({ ...crop, ...a });

	return (
		<div className="my-4">
			<div className="flex items-center justify-between mb-4">
				<Text variant="bold" size="big">
					Ajustes
				</Text>
			</div>

			<Input
				label={x + "%"}
				type="range"
				value={x}
				step={0.1}
				min={0}
				max={offsetX}
				onChange={(e) => handleChange({ x: parseFloat(e.target.value) })}
			/>

			<Input
				label={offsetX + "%"}
				type="range"
				value={offsetX}
				step={0.1}
				min={x}
				max={100}
				onChange={(e) => handleChange({ offsetX: parseFloat(e.target.value) })}
			/>

			<Input
				label={y + "%"}
				type="range"
				value={y}
				step={0.1}
				min={0}
				max={offsetY}
				onChange={(e) => handleChange({ y: parseFloat(e.target.value) })}
			/>

			<Input
				label={offsetY + "%"}
				type="range"
				value={offsetY}
				step={0.1}
				min={y}
				max={100}
				onChange={(e) => handleChange({ offsetY: parseFloat(e.target.value) })}
			/>
		</div>
	);
};

export default CropForm;
