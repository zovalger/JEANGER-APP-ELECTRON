import { useEffect, useRef, useState } from "react";
import RouterLinks from "../../common/config/RouterLinks";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Input from "../../common/components/Input";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
	const [original, setOriginal] = useState<ImageData>(null);

	useEffect(() => {
		setCtx(canvasRef.current.getContext("2d"));
	}, [canvasRef.current]);

	const [brillo, setBrillo] = useState(0);
	const [luces, setLuces] = useState(0);
	const [sombras, setSombras] = useState(0);
	const [exposicion, setExposicion] = useState(0);

	const dibujar = () => {
		const newFrame = new ImageData(
			canvasRef.current.width,
			canvasRef.current.height
		);

		const data = newFrame.data;

		for (let i = 0; i < newFrame.data.length; i += 4) {
			let lum =
				(original.data[i + 0] + original.data[i + 1] + original.data[i + 2]) /
				3;

			lum *= exposicion / 100 + 1;
			lum += brillo;
			lum = lum >= 128 ? lum + luces : lum;
			lum = lum < 128 ? lum - sombras : lum;

			data[i + 0] = lum;
			data[i + 1] = lum;
			data[i + 2] = lum;
			data[i + 3] = 255;
		}

		ctx.putImageData(newFrame, 0, 0);
	};

	useEffect(() => {
		if (ctx) dibujar();
	}, [brillo, luces, sombras, exposicion]);

	return (
		<PageTemplateLayout
			backButtonURL={RouterLinks.Home}
			name="Editor imagenes"
			rightButtons={[]}
		>
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

			<Input
				label="Brillo"
				type="range"
				min={-100}
				max={100}
				step={1}
				value={brillo}
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
				value={luces}
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
				value={sombras}
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
				value={exposicion}
				onChange={(e) => {
					setExposicion(parseInt(e.target.value));
				}}
			/>

			<div className="flex justify-center h-full overflow-auto p-4 ">
				<canvas ref={canvasRef} className="w-full h-auto" />
			</div>
		</PageTemplateLayout>
	);
}
