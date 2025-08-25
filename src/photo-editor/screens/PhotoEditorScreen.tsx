import { useEffect, useRef, useState } from "react";
import RouterLinks from "../../common/config/RouterLinks";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import {
	Adjustments,
	defaultAdjustments,
	getImageDataFromFiles,
	ImageAccepted,
	ImageEditor,
} from "../helpers/ImageEditor.helper";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
	const [imagesUploaded, setImagesUploaded] = useState<ImageEditor[]>([]);
	const [selected, setSelected] = useState<string | null>(null);
	const [globalAdjustments, setGlobalAdjustments] =
		useState<Adjustments>(defaultAdjustments);

	useEffect(() => {
		setCtx(canvasRef.current.getContext("2d"));
	}, [canvasRef.current]);

	// const [presest, setPresest] = useState<"default" | "invert">("default");
	// const [brightness, setBrillo] = useState(0);
	// const [lights, setLuces] = useState(0);
	// const [shadows, setSombras] = useState(0);
	// const [exposure, setExposicion] = useState(0);
	// const [contrast, setContrast] = useState(0);
	// const [saturation, setSaturation] = useState(0);

	// const dibujar = () => {
	// 	if (presest == "default") byDefault();
	// 	if (presest == "invert") fondoNegro();
	// };

	// const byDefault = () => {
	// 	const newFrame = new ImageData(
	// 		canvasRef.current.width,
	// 		canvasRef.current.height
	// 	);

	// 	const data = newFrame.data;

	// 	for (let i = 0; i < newFrame.data.length; i += 4) {
	// 		const rgb = [
	// 			original.data[i + 0],
	// 			original.data[i + 1],
	// 			original.data[i + 2],
	// 		];

	// 		const options = {
	// 			brightness,
	// 			contrast,
	// 			exposure,
	// 			lights,
	// 			shadows,
	// 			saturation,
	// 			rgb,
	// 		};

	// 		data[i + 0] = applyColorFilters(original.data[i + 0], options);
	// 		data[i + 1] = applyColorFilters(original.data[i + 1], options);
	// 		data[i + 2] = applyColorFilters(original.data[i + 2], options);
	// 		data[i + 3] = 255;
	// 	}

	// 	ctx.putImageData(newFrame, 0, 0);
	// };

	// const fondoNegro = () => {
	// 	const newFrame = new ImageData(
	// 		canvasRef.current.width,
	// 		canvasRef.current.height
	// 	);

	// 	const data = newFrame.data;

	// 	for (let i = 0; i < newFrame.data.length; i += 4) {
	// 		const avg =
	// 			255 -
	// 			(original.data[i + 0] + original.data[i + 1] + original.data[i + 2]) /
	// 				3;

	// 		const rgb = [avg, avg, avg];

	// 		const options = {
	// 			brightness,
	// 			contrast,
	// 			exposure,
	// 			lights,
	// 			shadows,
	// 			saturation,
	// 			rgb,
	// 		};

	// 		data[i + 0] = applyColorFilters(avg, options);
	// 		data[i + 1] = applyColorFilters(avg, options);
	// 		data[i + 2] = applyColorFilters(avg, options);
	// 		data[i + 3] = 255;
	// 	}

	// 	ctx.putImageData(newFrame, 0, 0);
	// };

	// const download = () => {
	// 	canvasRef.current.toBlob((blob) => {
	// 		const url = URL.createObjectURL(blob);
	// 		const a = document.createElement("a");
	// 		a.href = url;
	// 		a.download = "canvas-image.jpg";
	// 		a.click();
	// 		URL.revokeObjectURL(url); // Clean up after download
	// 	}, "image/jpg");
	// };

	// useEffect(() => {
	// 	if (ctx) dibujar();
	// }, [brightness, lights, shadows, exposure, contrast, saturation, presest]);

	return (
		<PageTemplateLayout
			backButtonURL={RouterLinks.Dashboard}
			name="Editor imagenes"
			rightButtons={[]}
		>
			<div className="flex flex-col">
				<div className="mx-4 my-2">
					<Input
						label="Imagenes a editar"
						type="file"
						accept={Object.values(ImageAccepted).join(",")}
						multiple
						onChange={(e) => {
							if (e.target.files.length == 0) return;
							getImageDataFromFiles(e.target.files)
								.then((images) => setImagesUploaded(images))
								.catch((error) => {
									console.error(error);
									alert(error);
								});
						}}
					/>
				</div>

				<div className="flex mx-4 h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
					{imagesUploaded.map((img) => (
						<div
							className="flex flex-col max-w-32 h-full shrink-0 relative shadow px-2 pt-2 pb-1 rounded bg-white"
							onClick={() => setSelected(img.tempId)}
						>
							<div className=" flex-1 flex justify-center rounded overflow-hidden">
								<img
									className="h-full w-auto"
									key={img.tempId}
									src={img.mainImg.src}
									alt={img.fileName}
								/>
							</div>

							<div className="flex">
								<Text className="flex overflow-hidden text-nowrap">
									{img.fileName}
								</Text>

								<IconButton
									icon="Close"
									className="ml-auto"
									size="tiny"
									onClick={() =>
										setImagesUploaded((prev) =>
											prev.filter((i) => i.tempId != img.tempId)
										)
									}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-2">
				<div>imagen seleccionada:{selected}</div>
				<div className=" flex justify-center h-full overflow-auto p-4 ">
					<canvas ref={canvasRef} className="w-full h-auto bg-gray-200 p-4" />
				</div>

				<div>
					{/* <Button onClick={download}> descargar</Button>
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
					</Button> */}

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

					{/* <Input
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
					/> */}
				</div>
			</div>
		</PageTemplateLayout>
	);
}
