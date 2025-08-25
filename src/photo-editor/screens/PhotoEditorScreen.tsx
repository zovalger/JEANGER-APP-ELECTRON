import { useEffect, useRef, useState } from "react";
import RouterLinks from "../../common/config/RouterLinks";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import {
	Adjustments,
	BN_Adjustments,
	clearCanvas,
	defaultAdjustments,
	Enchance_Adjustments,
	FilterEffect,
	FondoNegroAdjustments,
	getImageDataFromFiles,
	ImageAccepted,
	ImageEditor,
	showImage,
} from "../helpers/ImageEditor.helper";
import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import ColorAdjustmentsForm from "../components/ColorAdjustmentsForm";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imagesUploaded, setImagesUploaded] = useState<ImageEditor[]>([]);
	const [globalAdjustments, setGlobalAdjustments] =
		useState<Adjustments>(defaultAdjustments);

	const [selected, setSelected] = useState<string | null>(null);

	const [currentAdjustments, setCurrentAdjustments] =
		useState<Adjustments>(defaultAdjustments);

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

	const selectImage = (img: ImageEditor) => {
		setSelected(img.tempId);
		showImage(canvasRef.current, img);

		if (img.adjustments) setCurrentAdjustments(img.adjustments);
		else setCurrentAdjustments(globalAdjustments);
	};

	const deleteImage = (tempId: string) => {
		setImagesUploaded((prev) =>
			prev.filter((item, index) => {
				if (item.tempId == selected && selected == tempId) {
					const toIndex =
						index + 1 < imagesUploaded.length - 2
							? index + 1
							: index - 1 >= 0
							? index - 1
							: 1;

					if (imagesUploaded.length - 1 <= 0) {
						clearCanvas(canvasRef.current);
					} else {
						showImage(canvasRef.current, imagesUploaded[toIndex]);
						setSelected(imagesUploaded[toIndex].tempId);
					}

					URL.revokeObjectURL(item.mainImg.src);
				}

				return item.tempId != tempId;
			})
		);
	};

	const SetFilterEffect = (
		tempId: string,
		effect: FilterEffect,
		adjustments: Adjustments
	) => {};

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
								.then((images) => {
									setImagesUploaded(images);
									setSelected(images[0].tempId);
									showImage(canvasRef.current, images[0]);
								})
								.catch((error) => {
									console.error(error);
									alert(error);
								});
						}}
					/>
				</div>
			</div>

			<div className=" flex justify-center h-full overflow-auto p-4 ">
				<canvas ref={canvasRef} className="w-full h-auto bg-gray-200 p-4" />
			</div>

			{!!imagesUploaded.length && (
				<div className="flex mx-4 h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
					{imagesUploaded.map((img) => (
						<div
							className="flex flex-col max-w-32 h-full shrink-0 relative shadow px-2 pt-2 pb-1 rounded bg-white"
							onClick={() => selectImage(img)}
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
									onClick={() => deleteImage(img.tempId)}
								/>
							</div>
						</div>
					))}
				</div>
			)}

			<div className="mx-4">
				<Text variant="bold">Prestablecidos</Text>
				<div className="flex gap-2 flex-wrap">
					<Button
						onClick={() => SetFilterEffect(selected, "none", BN_Adjustments)}
					>
						B/N
					</Button>
					<Button
						onClick={() =>
							SetFilterEffect(selected, "invert", defaultAdjustments)
						}
					>
						Invertir
					</Button>
					<Button
						onClick={() =>
							SetFilterEffect(selected, "invert", FondoNegroAdjustments)
						}
					>
						Fondo negro
					</Button>
					<Button
						onClick={() =>
							SetFilterEffect(selected, "none", Enchance_Adjustments)
						}
					>
						Auto Mejorar
					</Button>
				</div>
			</div>

			<ColorAdjustmentsForm
				adjustments={currentAdjustments}
				setAdjustments={setCurrentAdjustments}
			/>

			{/* <Button onClick={download}> descargar</Button> */}
		</PageTemplateLayout>
	);
}
