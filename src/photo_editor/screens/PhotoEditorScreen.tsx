import { useState } from "react";
import FileSaver from "file-saver";
import JSZip from "jszip";
import toast from "react-hot-toast";

import RouterLinks from "../../common/config/RouterLinks";
import PageTemplateLayout from "../../common/Layouts/PageTemplate.layout";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import {
	BN_Adjustments,
	defaultAdjustments,
	Enchance_Adjustments,
	FondoNegroAdjustments,
	ImageAccepted,
} from "../helpers/ImageEditor.helper";
import Text from "../../common/components/Text";
import ColorAdjustmentsForm from "../components/ColorAdjustmentsForm";

import ImageEditItem from "../components/ImageEditItem";
import usePhotoEditorWeb from "../hooks/usePhotoEditorWeb";
import { SelectMode } from "../../common/enums/SelectMode.enum";
import usePdfWeb from "../../pdf_tools/hooks/usePdfWeb";

export default function PhotoEditorScreen() {
	const { ImgToPdf } = usePdfWeb();
	const {
		canvasRef,
		currentAdjustments,
		handleAdjustmentsChange,
		imagesUploaded,
		uploadFiles,
		changeSelectMark,
		selectImageByMode,
		SetFilterEffect,
		rotateImg,
		deleteImage,
		generateExport,
		isExporting,
		zoom,
		applyZoom,
	} = usePhotoEditorWeb();

	const [qualityExport, setQualityExport] = useState(80);

	const msgExport = (msg: string, success: boolean, error: boolean) => {
		if (error) return toast.error(msg);
		if (success) return toast.success(msg);

		toast.loading(msg, { duration: 2000 });
	};

	const download = async () => {
		const images = await generateExport(qualityExport, msgExport);

		if (images.length <= 1) {
			if (!images[0].modifiedImg)
				return toast.error("No hay imagenes para descargar");

			FileSaver.saveAs(images[0].modifiedImg, "new " + images[0].fileName);

			return;
		}

		const nameZip = new Date().toString();

		const zip = new JSZip();
		const img = zip.folder(nameZip);

		for (const item of images) {
			if (!item.modifiedImg) continue;
			img.file(item.fileName, item.modifiedImg, { base64: true });
		}

		const contentZip = await zip.generateAsync({ type: "blob" });

		FileSaver.saveAs(contentZip, nameZip + ".zip");
	};

	const downloadToPdf = async () => {
		const images = await generateExport(qualityExport, msgExport);

		await ImgToPdf(
			images.map((i) => ({
				tempId: i.tempId,
				data: i.modifiedImg,
				fileName: i.fileName,
				width: i.width,
				height: i.height,
				rotation: i.rotation,
			}))
		);
	};

	// useEffect(() => {
	// 	if (canvasRef.current) drawCanvas();
	// }, [currentAdjustments, fileInView, currentFilter]);

	const allAreSelected =
		imagesUploaded.filter((i) => i.isSelected).length ==
			imagesUploaded.length && imagesUploaded.length > 0;

	return (
		<PageTemplateLayout
			backButtonURL={RouterLinks.Dashboard}
			name="Editor imagenes"
			rightButtons={[]}
		>
			<div className="flex flex-col md:grid md:grid-cols-4 gap-4 mt-4 mx-4">
				<div className="flex flex-col col-span-3">
					<div className="flex flex-col">
						<div className="my-2">
							<Input
								label="Imagenes a editar"
								type="file"
								accept={Object.values(ImageAccepted).join(",")}
								multiple
								onChange={(e) => {
									if (e.target.files.length == 0) return;

									uploadFiles(e.target.files);
								}}
							/>
						</div>
					</div>

					<div className="flex justify-between">
						<Button onClick={() => rotateImg(-90)}>-90°</Button>

						<Input
							label={"Zoom: " + zoom}
							type="range"
							value={zoom}
							onChange={(e) => applyZoom(parseFloat(e.target.value))}
							min={0.1}
							step={0.1}
							max={200}
						/>

						<Button onClick={() => rotateImg(90)}>+90°</Button>
					</div>

					<div className=" flex h-[calc(h-screen - h-10)]  justify-center overflow-auto p-4 ">
						<canvas
							ref={canvasRef}
							className={`bg-gray-200 ${canvasRef.current && canvasRef.current.width > canvasRef.current.height ? "w-full h-auto" : "w-auto h-full"} `}
						/>
					</div>
				</div>

				<div className="col-span-1">
					{!!imagesUploaded.length && (
						<>
							<div>
								<Text variant="bold">Tipos de selección</Text>
								<div className="flex flex-wrap">
									<Button
										textJustify="left"
										size="tiny"
										onClick={() => selectImageByMode(SelectMode.impar)}
									>
										Impares
									</Button>
									<Button
										textJustify="left"
										size="tiny"
										onClick={() => selectImageByMode(SelectMode.par)}
									>
										Pares
									</Button>

									<Button
										textJustify="left"
										size="tiny"
										onClick={() => selectImageByMode(SelectMode.invertSelect)}
									>
										Invertir
									</Button>

									<Button
										textJustify="left"
										size="tiny"
										icon={allAreSelected ? "SquareCheck" : "Square"}
										onClick={() =>
											selectImageByMode(
												allAreSelected ? SelectMode.diselectAll : SelectMode.all
											)
										}
									>
										{allAreSelected ? "Deseleccionar" : "Todos"}
									</Button>
								</div>
							</div>

							<div className="flex h-42 gap-2 p-1 rounded overflow-y-hidden overflow-x-auto">
								{imagesUploaded.map((img) => (
									<ImageEditItem
										key={img.tempId}
										data={img}
										onClick={(tempId: string) => {
											selectImageByMode(SelectMode.one, tempId);
										}}
										onDelete={deleteImage}
										onClickCheck={changeSelectMark}
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
										size="tiny"
									>
										Original
									</Button>
									<Button
										onClick={() =>
											SetFilterEffect("none", Enchance_Adjustments)
										}
										size="tiny"
									>
										Auto
									</Button>
									<Button
										onClick={() => SetFilterEffect("none", BN_Adjustments)}
										size="tiny"
									>
										B/N
									</Button>

									<Button
										onClick={() =>
											SetFilterEffect("invert", defaultAdjustments)
										}
										size="tiny"
									>
										Invertir
									</Button>

									<Button
										onClick={() =>
											SetFilterEffect("invert", FondoNegroAdjustments)
										}
										size="tiny"
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
