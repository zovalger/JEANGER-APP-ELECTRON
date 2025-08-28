import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import JSZip from "jszip";
import toast from "react-hot-toast";
import { PDFDocument } from "pdf-lib";

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

import ImageEditItem from "../components/ImageEditItem";

export default function PhotoEditorScreen() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imagesUploaded, setImagesUploaded] = useState<ImageEditor[]>([]);

	const [currentAdjustments, setCurrentAdjustments] =
		useState<Adjustments>(defaultAdjustments);

	const [currentFilter, setCurrentFilter] = useState<string>("");

	const [fileInView, setFileInView] = useState<string | null>(null);
	const [isExporting, setIsExporting] = useState(false);
	const [qualityExport, setQualityExport] = useState(80);

	const drawCanvas = () => {
		if (!canvasRef.current || !fileInView) return;

		const img = imagesUploaded.find((i) => i.tempId == fileInView);
		if (!img) return;

		showImage(canvasRef.current, img);
	};

	const generate = async (quality: number) => {
		if (isExporting) {
			toast.error("Ya se está exportando, espera un momento");
			throw new Error("Ya se está exportando, espera un momento");
		}

		setIsExporting(true);

		return await generateExportImages(
			canvasRef.current,
			imagesUploaded,
			quality,
			(i) => {
				if (i < 0) return toast.success("Render finalizado");

				toast.loading("procesando: " + imagesUploaded[i].fileName, {
					duration: 2000,
				});
			}
		);
	};

	const download = async () => {
		const images = await generate(qualityExport);

		if (images.length <= 1) {
			const url = URL.createObjectURL(images[0].modifiedImg);
			const a = document.createElement("a");
			a.href = url;
			a.download = "new " + images[0].fileName;
			a.click();
			URL.revokeObjectURL(url);

			return setIsExporting(false);
		}

		const zip = new JSZip();

		const nameZip = new Date().toString();
		const img = zip.folder(nameZip);

		for (const item of images) {
			if (!item.modifiedImg) continue;

			img.file(item.fileName, item.modifiedImg, { base64: true });
		}

		const contentZip = await zip.generateAsync({ type: "blob" });

		FileSaver.saveAs(contentZip, nameZip + ".zip");

		setIsExporting(false);
	};

	const downloadToPdf = async () => {
		setIsExporting(true);
		const images = await generate(qualityExport);

		const pdfDoc = await PDFDocument.create();

		for (const img of images) {
			if (!img.modifiedImg) continue;

			const { width, height, rotation } = img;

			const jpgImage = await pdfDoc.embedJpg(
				await img.modifiedImg.arrayBuffer()
			);

			const anguloRadian = (rotation * Math.PI) / 180;

			const newWidth =
				Math.abs(width * Math.cos(anguloRadian)) +
				Math.abs(height * Math.sin(anguloRadian));

			const newHeight =
				Math.abs(width * Math.sin(anguloRadian)) +
				Math.abs(height * Math.cos(anguloRadian));
			const page = pdfDoc.addPage([newWidth, newHeight]);

			page.drawImage(jpgImage, {
				x: 0,
				y: 0,
				width: newWidth,
				height: newHeight,
			});
		}

		const pdfBytes = await pdfDoc.save();

		const url = URL.createObjectURL(
			pdfBytes instanceof Blob
				? pdfBytes
				: new Blob([pdfBytes], { type: "application/pdf" })
		);
		const a = document.createElement("a");
		a.href = url;
		a.download =
			"new " + images[0].fileName.split(".").slice(0, -1).join(".") + ".pdf";
		a.click();
		URL.revokeObjectURL(url);

		setIsExporting(false);
	};

	useEffect(() => {
		if (canvasRef.current) drawCanvas();
	}, [currentAdjustments, fileInView, currentFilter]);

	const SetFilterEffect = (
		filterEffect: FilterEffect,
		adjustments: Adjustments
	) => {
		setCurrentFilter(filterEffect);
		setCurrentAdjustments(adjustments);
		setImagesUploaded((prev) =>
			prev.map((i) => (i.isSelected ? { ...i, adjustments, filterEffect } : i))
		);
	};

	const selectAll = (s = false) => {
		setImagesUploaded((prev) => {
			const a = prev.map((i) => ({ ...i, isSelected: s }));
			selectToView(a.find((i) => i.isSelected)?.tempId);
			return a;
		});
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

	const selectToView = (tempId: string) => {
		const g = imagesUploaded.find((i) => i.tempId == tempId);

		setFileInView(tempId);
		// setImagesUploaded((prev) =>
		// 	prev.map((i) => ({ ...i, isSelected: tempId == i.tempId }))
		// );

		if (!g) return;
		setCurrentAdjustments(g.adjustments);
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
							selectToView(imagesUploaded[toIndex].tempId);
						}

						URL.revokeObjectURL(item.mainImg.src);
					}
				}

				return item.tempId != tempId;
			})
		);
	};

	const rotate = (r: number) => {
		const img = imagesUploaded.find((i) => i.tempId == fileInView);

		if (!img || !canvasRef.current) return;

		setImagesUploaded((prev) => {
			const a = prev.map((i) => {
				if (!i.isSelected) return i;

				const newangle = i.rotation + r;

				return {
					...i,
					rotation:
						newangle >= 360
							? newangle - 360
							: newangle < 0
								? newangle + 360
								: newangle,
				};
			});

			showImage(
				canvasRef.current,
				a.find((i) => i.isSelected)
			);

			return a;
		});
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
											selectToView(images[0].tempId);
											selectAll(true);
										})
										.catch((error) => {
											console.error(error);
											alert(error);
										});
								}}
							/>
						</div>
					</div>

					<div className="flex justify-between">
						<Button onClick={() => rotate(-90)}>-90°</Button>
						<Button onClick={() => rotate(90)}>+90°</Button>
					</div>

					<div className=" flex justify-center h-full overflow-auto p-4 ">
						<canvas ref={canvasRef} className="w-full h-auto bg-gray-200" />
					</div>
				</div>

				<div>
					{!!imagesUploaded.length && (
						<>
							<div>
								<Text variant="bold">Tipos de selección</Text>
								<div className="flex flex-wrap">
									<Button
										textJustify="left"
										onClick={() =>
											setImagesUploaded((prev) => {
												const a = prev.map((i, index) => ({
													...i,
													isSelected: !(index % 2),
												}));

												selectToView(a.find((i) => i.isSelected)?.tempId);

												return a;
											})
										}
									>
										Impares
									</Button>
									<Button
										textJustify="left"
										onClick={() =>
											setImagesUploaded((prev) => {
												const a = prev.map((i, index) => ({
													...i,
													isSelected: !!(index % 2),
												}));

												selectToView(a.find((i) => i.isSelected)?.tempId);
												return a;
											})
										}
									>
										Pares
									</Button>

									<Button
										textJustify="left"
										onClick={() =>
											setImagesUploaded((prev) => {
												const a = prev.map((i) => ({
													...i,
													isSelected: !i.isSelected,
												}));

												selectToView(a.find((i) => i.isSelected)?.tempId);

												return a;
											})
										}
									>
										Invertir
									</Button>

									<Button
										textJustify="left"
										icon={allAreSelected ? "SquareCheck" : "Square"}
										onClick={() => selectAll(!allAreSelected)}
									>
										{allAreSelected ? "Deseleccionar" : "Todos"}
									</Button>
								</div>
							</div>

							<div className="flex h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
								{imagesUploaded.map((img) => (
									<ImageEditItem
										data={img}
										onClick={(tempId: string) => {
											setImagesUploaded((prev) =>
												prev.map((i) => ({
													...i,
													isSelected: tempId == i.tempId,
												}))
											);
											selectToView(tempId);
										}}
										onDelete={deleteImage}
										onClickCheck={selectImage}
									/>
								))}
							</div>
						</>
					)}

					{imagesUploaded.some((i) => i.isSelected) && (
						<>
							<div className="mt-4">
								<Text variant="bold">Filtros prestablecidos</Text>
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

							<div className="border-b my-4"></div>

							<div>
								<Input
									label={
										"Calidad de exportación: " +
										qualityExport +
										"% (mayor calidad, mayor tamaño)"
									}
									type="range"
									value={qualityExport}
									onChange={(e) => setQualityExport(parseInt(e.target.value))}
									min={1}
									max={100}
								/>
								<div className="flex gap-2 flex-wrap mt-4">
									<Button onClick={download} disabled={isExporting}>
										Descargar Todo
									</Button>

									<Button onClick={downloadToPdf} disabled={isExporting}>
										Exportar a PDF
									</Button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</PageTemplateLayout>
	);
}
