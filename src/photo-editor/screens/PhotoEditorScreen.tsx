import { useEffect, useRef, useState } from "react";
import RouterLinks from "../../common/config/RouterLinks";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Input from "../../common/components/Input";
import { applyColorFilters } from "../helpers/FilterColor.helper";
import Button from "../../common/components/Button";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
	const [original, setOriginal] = useState<ImageData>(null);

	useEffect(() => {
		setCtx(canvasRef.current.getContext("2d"));
	}, [canvasRef.current]);

	const [presest, setPresest] = useState<"default" | "invert">("default");
	const [brightness, setBrillo] = useState(0);
	const [lights, setLuces] = useState(0);
	const [shadows, setSombras] = useState(0);
	const [exposure, setExposicion] = useState(0);
	const [contrast, setContrast] = useState(0);
	const [saturation, setSaturation] = useState(0);

	const dibujar = () => {
		if (presest == "default") byDefault();
		if (presest == "invert") fondoNegro();
	};

	const byDefault = () => {
		const newFrame = new ImageData(
			canvasRef.current.width,
			canvasRef.current.height
		);

		const data = newFrame.data;

		for (let i = 0; i < newFrame.data.length; i += 4) {
			const rgb = [
				original.data[i + 0],
				original.data[i + 1],
				original.data[i + 2],
			];

			const options = {
				brightness,
				contrast,
				exposure,
				lights,
				shadows,
				saturation,
				rgb,
			};

			data[i + 0] = applyColorFilters(original.data[i + 0], options);
			data[i + 1] = applyColorFilters(original.data[i + 1], options);
			data[i + 2] = applyColorFilters(original.data[i + 2], options);
			data[i + 3] = 255;
		}

		ctx.putImageData(newFrame, 0, 0);
	};

	const fondoNegro = () => {
		const newFrame = new ImageData(
			canvasRef.current.width,
			canvasRef.current.height
		);

		const data = newFrame.data;

		for (let i = 0; i < newFrame.data.length; i += 4) {
			const avg =
				255 -
				(original.data[i + 0] + original.data[i + 1] + original.data[i + 2]) /
					3;

			const rgb = [avg, avg, avg];

			const options = {
				brightness,
				contrast,
				exposure,
				lights,
				shadows,
				saturation,
				rgb,
			};

			data[i + 0] = applyColorFilters(avg, options);
			data[i + 1] = applyColorFilters(avg, options);
			data[i + 2] = applyColorFilters(avg, options);
			data[i + 3] = 255;
		}

		ctx.putImageData(newFrame, 0, 0);
	};

	const download = () => {
		canvasRef.current.toBlob((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "canvas-image.jpg";
			a.click();
			URL.revokeObjectURL(url); // Clean up after download
		}, "image/jpg");
	};

	useEffect(() => {
		if (ctx) dibujar();
	}, [brightness, lights, shadows, exposure, contrast, saturation, presest]);

	return (
		<PageTemplateLayout
			backButtonURL={RouterLinks.Dashboard}
			name="Editor imagenes"
			rightButtons={[]}
		>
			<div className="grid grid-cols-2">
				<div className=" flex justify-center h-full overflow-auto p-4 ">
					<canvas ref={canvasRef} className="w-full h-auto bg-gray-200 p-4" />
				</div>

				<div>
					<Button onClick={download}> descargar</Button>
					<Button
						onClick={() => {
							setPresest("invert");
							setBrillo(0);
							setLuces(60);
							setSombras(0);
							setExposicion(25);
							setContrast(15);
							setSaturation(-100);
						}}
					>
						Fondo negro
					</Button>
					<Button
						onClick={() => {
							setPresest("default");
							setBrillo(0);
							setLuces(0);
							setSombras(0);
							setExposicion(0);
							setContrast(0);
							setSaturation(0);
						}}
					>
						Reset
					</Button>

					<Input
						type="file"
						onChange={(e) => {
							const image = new Image();

							image.onload = (ee) => {
								console.log(ee);
								canvasRef.current.width = image.width;
								canvasRef.current.height = image.height;
								ctx.drawImage(image, 0, 0);

								const frame = ctx.getImageData(
									0,
									0,
									canvasRef.current.width,
									canvasRef.current.height
								);

								setOriginal(frame);
							};
							image.src = URL.createObjectURL(e.target.files[0]);
						}}
					/>

					{/* <Input
						label="zoom"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={zoom}
						onChange={(e) => {
							setZoom(parseInt(e.target.value));

							ctx.scale(parseInt(e.target.value), parseInt(e.target.value));
						}}
					/> */}

					<Input
						label={"Brillo: " + brightness}
						type="range"
						min={-100}
						max={100}
						step={1}
						value={brightness}
						onChange={(e) => {
							setBrillo(parseInt(e.target.value));
						}}
					/>

					<Input
						label="Luces"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={lights}
						onChange={(e) => {
							setLuces(parseInt(e.target.value));
						}}
					/>

					<Input
						label="Sombras"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={shadows}
						onChange={(e) => {
							setSombras(parseInt(e.target.value));
						}}
					/>

					<Input
						label="exposicion"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={exposure}
						onChange={(e) => {
							setExposicion(parseInt(e.target.value));
						}}
					/>

					<Input
						label="contraste"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={contrast}
						onChange={(e) => {
							setContrast(parseInt(e.target.value));
						}}
					/>
					<Input
						label="saturacion"
						type="range"
						min={-100}
						max={100}
						step={1}
						value={saturation}
						onChange={(e) => {
							setSaturation(parseInt(e.target.value));
						}}
					/>
				</div>
			</div>
		</PageTemplateLayout>
	);
}
