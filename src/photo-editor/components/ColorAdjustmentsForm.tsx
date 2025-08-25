import Input from "../../common/components/Input";
import { Adjustments } from "../helpers/ImageEditor.helper";

interface props {
	adjustments: Adjustments;
	setAdjustments(adjustments: Adjustments): void;
}
const ColorAdjustmentsForm = (props: props) => {
	const { adjustments, setAdjustments } = props;

	const {
		brightness,
		contrast,
		exposure,
		lights,
		saturation,
		shadows,
		temperature,
	} = adjustments;

	return (
		<div>
			<Input
				label={"Brillo: " + brightness}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={brightness}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						brightness: parseInt(e.target.value),
					})
				}
			/>

			<Input
				label={"Luces: " + lights}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={lights}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						lights: parseInt(e.target.value),
					})
				}
			/>

			<Input
				label={"Sombras:" + shadows}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={shadows}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						shadows: parseInt(e.target.value),
					})
				}
			/>

			<Input
				label={"Exposición: " + exposure}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={exposure}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						exposure: parseInt(e.target.value),
					})
				}
			/>

			<Input
				label={"Contraste: " + contrast}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={contrast}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						contrast: parseInt(e.target.value),
					})
				}
			/>
			<Input
				label={"Saturación: " + saturation}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={saturation}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						saturation: parseInt(e.target.value),
					})
				}
			/>

			<Input
				label={"Temperatura: " + temperature}
				type="range"
				min={-100}
				max={100}
				step={1}
				value={temperature}
				onChange={(e) =>
					setAdjustments({
						...adjustments,
						temperature: parseInt(e.target.value),
					})
				}
			/>
		</div>
	);
};

export default ColorAdjustmentsForm;
