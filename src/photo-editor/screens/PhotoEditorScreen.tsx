import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
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
	generateExportImages,
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
import JSZip from "jszip";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imagesUploaded, setImagesUploaded] = useState<ImageEditor[]>([]);

	const [currentAdjustments, setCurrentAdjustments] =
		useState<Adjustments>(defaultAdjustments);

	const [fileInView, setFileInView] = useState<string | null>(null);

	const drawCanvas = () => {
		if (!canvasRef.current || !fileInView) return;

		const img = imagesUploaded.find((i) => i.tempId == fileInView);
		if (!img) return;

		showImage(canvasRef.current, img);
	};

	const download = async () => {
		const images = await generateExportImages(imagesUploaded);
		const zip = new JSZip();

		const nameZip = new Date().toString();
		const img = zip.folder(nameZip);

		for (const item of images) {
			img.file(item.fileName, item.modifiedImg, { base64: true });
			images;
		}

		const contentZip = await zip.generateAsync({ type: "blob" });

		FileSaver.saveAs(contentZip, nameZip + ".zip");

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
		if (canvasRef.current) drawCanvas();
	}, [currentAdjustments, fileInView]);

	const SetFilterEffect = (
		filterEffect: FilterEffect,
		adjustments: Adjustments
	) => {
		setCurrentAdjustments(adjustments);
		setImagesUploaded((prev) =>
			prev.map((i) => (i.isSelected ? { ...i, adjustments, filterEffect } : i))
		);
	};

	const selectAll = (s = false) => {
		setImagesUploaded((prev) => prev.map((i) => ({ ...i, isSelected: s })));
	};

	const selectImage = (tempId: string, isSelected: boolean) => {
		setImagesUploaded((prev) =>
			prev.map((i) => (tempId == i.tempId ? { ...i, isSelected } : i))
		);
	};

	const handleAdjustmentsChange = (adjustments: Adjustments) => {
		setCurrentAdjustments(adjustments);

		setImagesUploaded((prev) =>
			prev.map((i) => (i.isSelected ? { ...i, adjustments } : i))
		);
	};

	const selectToView = (img: ImageEditor) => {
		setFileInView(img.tempId);

		setImagesUploaded((prev) =>
			prev.map((i) => ({ ...i, isSelected: img.tempId == i.tempId }))
		);

		setCurrentAdjustments(img.adjustments);
	};

	const deleteImage = (tempId: string) => {
		setImagesUploaded((prev) =>
			prev.filter((item, index) => {
				if (item.tempId == tempId) {
					if (fileInView == tempId) {
						const toIndex =
							index + 1 < imagesUploaded.length - 2
								? index + 1
								: index - 1 >= 0
								? index - 1
								: 1;

						if (imagesUploaded.length - 1 <= 0) {
							clearCanvas(canvasRef.current);
						} else {
							selectToView(imagesUploaded[toIndex]);
						}

						URL.revokeObjectURL(item.mainImg.src);
					}
				}

				return item.tempId != tempId;
			})
		);
	};

	const allAreSelected =
		imagesUploaded.filter((i) => i.isSelected).length ==
			imagesUploaded.length && imagesUploaded.length > 0;

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
											selectToView(images[0]);
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
				</div>

				<div>
					{!!imagesUploaded.length && (
						<>
							<div>
								<Button
									textJustify="left"
									icon={allAreSelected ? "SquareCheck" : "Square"}
									onClick={() => selectAll(!allAreSelected)}
								>
									Seleccionar todos
								</Button>
							</div>

							<div className="flex h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
								{imagesUploaded.map((img) => (
									<div
										key={img.tempId}
										className="flex flex-col max-w-32 h-full shrink-0 shadow px-2 pt-2 pb-1 rounded bg-white"
										onClick={() => selectToView(img)}
									>
										<div className="flex justify-end">
											<IconButton
												size="tiny"
												icon={img.isSelected ? "SquareCheck" : "Square"}
												onClick={() => {
													selectImage(img.tempId, !img.isSelected);
												}}
											/>
										</div>
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
						</>
					)}

					{imagesUploaded.some((i) => i.isSelected) && (
						<>
							<div className="">
								<Text variant="bold">Prestablecidos</Text>
								<div className="flex gap-2 flex-wrap">
									<Button
										onClick={() => SetFilterEffect("none", defaultAdjustments)}
									>
										Original
									</Button>
									<Button
										onClick={() =>
											SetFilterEffect("none", Enchance_Adjustments)
										}
									>
										Auto
									</Button>
									<Button
										onClick={() => SetFilterEffect("none", BN_Adjustments)}
									>
										B/N
									</Button>
									<Button
										onClick={() =>
											SetFilterEffect("invert", defaultAdjustments)
										}
									>
										Invertir
									</Button>
									<Button
										onClick={() =>
											SetFilterEffect("invert", FondoNegroAdjustments)
										}
									>
										Fondo negro
									</Button>
								</div>
							</div>

							<ColorAdjustmentsForm
								adjustments={currentAdjustments}
								setAdjustments={handleAdjustmentsChange}
							/>
						</>
					)}
				</div>
			</div>

			{/* <Button onClick={download}> descargar</Button> */}
		</PageTemplateLayout>
	);
}
