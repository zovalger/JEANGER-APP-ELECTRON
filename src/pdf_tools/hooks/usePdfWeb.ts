import { PDFDocument } from "pdf-lib";

export interface ImgToPdf {
	tempId: string;
	data: Blob;
	fileName: string;
	width: number;
	height: number;
	rotation: number;
}

export enum SheetType {
	Letter,
	office,
	extreoffice,
	A0,
	A1,
	A2,
	A3,
	A4,
	A5,
	A6,
	A7,
	A8,
	A9,
	A10,
}

interface SheetSizeObject {
	[key: string]: { width: number; height: number };
}

export const SheetSize: SheetSizeObject = {
	Letter: { width: 2480, height: 3508 },
	office: { width: 2480, height: 3508 },
	extreoffice: { width: 2480, height: 3508 },
	A0: { width: 9933, height: 14043 },
	A1: { width: 7016, height: 9933 },
	A2: { width: 4961, height: 7016 },
	A3: { width: 3508, height: 4961 },
	A4: { width: 2480, height: 3508 },
	A5: { width: 1748, height: 2480 },
	A6: { width: 1240, height: 1748 },
	A7: { width: 874, height: 1240 },
	A8: { width: 614, height: 874 },
	A9: { width: 437, height: 614 },
	A10: { width: 307, height: 437 },
};

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
