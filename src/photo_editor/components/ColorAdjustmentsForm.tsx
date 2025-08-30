import Button from "../../common/components/Button";
import IconButton from "../../common/components/IconButton";
import Input from "../../common/components/Input";
import Text from "../../common/components/Text";
import { Adjustments, defaultAdjustments } from "../helpers/ImageEditor.helper";

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

	const handleChange = (a: Partial<Adjustments>) =>
		setAdjustments({ ...adjustments, ...a });

	return (
		<div className="my-4">
			<div className="flex items-center justify-between mb-4">
				<Text variant="bold" size="big">Ajustes</Text>
				<Button
					icon="Refresh"
					onClick={() => setAdjustments(defaultAdjustments)}
				>
					Resetear
				</Button>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Brillo: {brightness}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ brightness: brightness - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ brightness: brightness + 1 })}
					/>
				</div>

				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={brightness}
					onChange={(e) =>
						handleChange({ brightness: parseInt(e.target.value) })
					}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Luces: {lights}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ lights: lights - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ lights: lights + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={lights}
					onChange={(e) => handleChange({ lights: parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Sombras: {shadows}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ shadows: shadows - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ shadows: shadows + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={shadows}
					onChange={(e) => handleChange({ shadows: parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Exposición: {exposure}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ exposure: exposure - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ exposure: exposure + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={exposure}
					onChange={(e) => handleChange({ exposure: parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Contraste: {contrast}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ contrast: contrast - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ contrast: contrast + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={contrast}
					onChange={(e) => handleChange({ contrast: parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Saturación: {saturation}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ saturation: saturation - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ saturation: saturation + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={saturation}
					onChange={(e) =>
						handleChange({ saturation: parseInt(e.target.value) })
					}
				/>
			</div>

			<div>
				<div className="flex items-center">
					<Text variant="bold">Temperatura: {temperature}</Text>
					<IconButton
						icon="ChevronLeft"
						className="ml-auto"
						size="tiny"
						onClick={() => handleChange({ temperature: temperature - 1 })}
					/>
					<IconButton
						icon="ChevronLeft"
						className="rotate-180"
						size="tiny"
						onClick={() => handleChange({ temperature: temperature + 1 })}
					/>
				</div>
				<Input
					type="range"
					min={-100}
					max={100}
					step={1}
					value={temperature}
					onChange={(e) =>
						handleChange({ temperature: parseInt(e.target.value) })
					}
				/>
			</div>
		</div>
	);
};

export default ColorAdjustmentsForm;
