import { PDFDocument } from "pdf-lib";

export interface ImgToPdf {
	tempId: string;
	data: Blob;
	fileName: string;
	width: number;
	height: number;
	rotation: number;
}

const usePdfWeb = () => {
	// todo: agregar opcion de tamaño de hoja
	const ImgToPdf = async (images: ImgToPdf[]) => {
		const pdfDoc = await PDFDocument.create();

		for (const img of images) {
			if (!img.data) continue;

			const { width, height, rotation } = img;

			const jpgImage = await pdfDoc.embedJpg(await img.data.arrayBuffer());

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
	};

	return { ImgToPdf };
};

export default usePdfWeb;
