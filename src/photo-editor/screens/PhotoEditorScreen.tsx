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
	const [currentAdjustments, setCurrentAdjustments] =
		useState<Adjustments>(defaultAdjustments);

	const [selected, setSelected] = useState<string | null>(null);

	const [isGlobalUse, setIsGlobalUse] = useState(true);

	const drawCanvas = () => {
		if (!canvasRef.current || !selected) return;

		const img = imagesUploaded.find((i) => i.tempId == selected);
		if (!img) return;

		showImage(canvasRef.current, {
			...img,
			adjustments: img.adjustments ? img.adjustments : currentAdjustments,
		});
	};

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

	useEffect(() => {
		if (canvasRef.current) drawCanvas();
	}, [currentAdjustments, selected]);

	const SetFilterEffect = (
		tempId: string,
		filterEffect: FilterEffect,
		adjustments: Adjustments
	) => {
		setCurrentAdjustments(adjustments);
		setIsGlobalUse(false);
		setImagesUploaded((prev) =>
			prev.map((i) =>
				i.tempId == tempId ? { ...i, adjustments, filterEffect } : i
			)
		);
	};

	const handleAdjustmentsContextChange = (newGlobalUse: boolean) => {
		setIsGlobalUse(newGlobalUse);

		if (newGlobalUse) {
			setCurrentAdjustments(globalAdjustments);
			setImagesUploaded((prev) =>
				prev.map((i) =>
					i.tempId == selected ? { ...i, adjustments: null } : i
				)
			);
		} else {
			const img = imagesUploaded.find((i) => i.tempId == selected);
			if (img) setCurrentAdjustments(img.adjustments || globalAdjustments);
		}
	};

	const handleAdjustmentsChange = (adjustments: Adjustments) => {
		setCurrentAdjustments(adjustments);

		if (isGlobalUse) return setGlobalAdjustments(adjustments);

		setImagesUploaded((prev) =>
			prev.map((i) => (i.tempId == selected ? { ...i, adjustments } : i))
		);
	};

	const selectImage = (img: ImageEditor) => {
		setSelected(img.tempId);

		if (img.adjustments) {
			setCurrentAdjustments(img.adjustments);
			setIsGlobalUse(false);
		} else {
			setCurrentAdjustments(globalAdjustments);
			setIsGlobalUse(true);
		}
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
						selectImage(imagesUploaded[toIndex]);
					}

					URL.revokeObjectURL(item.mainImg.src);
				}

				return item.tempId != tempId;
			})
		);
	};

	return (
		<PageTemplateLayout
			backButtonURL={RouterLinks.Dashboard}
			name="Editor imagenes"
			rightButtons={[]}
		>
			<div className="flex flex-col md:grid md:grid-cols-2 gap-4 mt-4 mx-4">
				<div className="flex flex-col">
					<div className="flex flex-col">
						<div className="my-2">
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
											selectImage(images[0]);
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
						<div className="flex h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
							{imagesUploaded.map((img) => (
								<div
									key={img.tempId}
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
				</div>

				<div>
					<div className="">
						<Text variant="bold">Prestablecidos</Text>
						<div className="flex gap-2 flex-wrap">
							<Button
								onClick={() =>
									SetFilterEffect(selected, "none", defaultAdjustments)
								}
							>
								Original
							</Button>
							<Button
								onClick={() =>
									SetFilterEffect(selected, "none", Enchance_Adjustments)
								}
							>
								Auto
							</Button>
							<Button
								onClick={() =>
									SetFilterEffect(selected, "none", BN_Adjustments)
								}
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
						</div>
					</div>
					<div>
						<Input
							label="Usar ajustes globales"
							type="checkbox"
							checked={isGlobalUse}
							onChange={(e) => handleAdjustmentsContextChange(e.target.checked)}
						/>
					</div>

					<ColorAdjustmentsForm
						adjustments={currentAdjustments}
						setAdjustments={handleAdjustmentsChange}
					/>
				</div>
			</div>

			{/* <Button onClick={download}> descargar</Button> */}
		</PageTemplateLayout>
	);
}
