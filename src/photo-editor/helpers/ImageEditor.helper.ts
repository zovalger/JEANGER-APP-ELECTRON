import { v4 as uuid } from "uuid";

export interface Adjustments {
	brightness: number;
	exposure: number;
	contrast: number;
	lights: number;
	shadows: number;
	saturation: number;
	temperature: number;
}

export type FilterEffect = "none" | "invert";

export interface ImageEditor {
	_id?: string;
	tempId: string;
	mainImg: HTMLImageElement;
	modifiedImg: Blob | null;
	fileName: string;
	filterEffect: FilterEffect;
	adjustments: Adjustments;
	width: number;
	height: number;
	rotation: number;
	cropX: number;
	cropY: number;
	cropOffsetX: number;
	cropOffsetY: number;
	isSelected: boolean;
}

export interface FilterColorSettings extends Adjustments {
	rgb: number[];
}

export enum ImageAccepted {
	png = "image/png",
	jpeg = "image/jpeg",
	jpg = "image/jpg",
	webp = "image/webp",
}

export const defaultAdjustments: Adjustments = {
	brightness: 0,
	exposure: 0,
	contrast: 0,
	lights: 0,
	shadows: 0,
	saturation: 0,
	temperature: 0,
};

export const FondoNegroAdjustments: Adjustments = {
	brightness: 0,
	exposure: 25,
	contrast: 15,
	lights: 60,
	shadows: 0,
	saturation: -100,
	temperature: 0,
};

export const BN_Adjustments: Adjustments = {
	brightness: 0,
	exposure: 0,
	contrast: 0,
	lights: 0,
	shadows: 0,
	saturation: -100,
	temperature: 0,
};

export const Enchance_Adjustments: Adjustments = {
	brightness: 0,
	exposure: 4,
	contrast: 4,
	lights: 12,
	shadows: 6,
	saturation: 25,
	temperature: 0,
};

// ****************************************************************************
// 														color modification
// ****************************************************************************

export const grayScaleFilter = (rgb: number[]) =>
	(rgb[0] + rgb[1] + rgb[2]) / 3;

export const negativeFilter = (n: number) => 255 - n;

export const applyColorFilters = (
	n: number,
	filterColorSettings: FilterColorSettings
) => {
	const { brightness, exposure, contrast, lights, saturation, shadows, rgb } =
		filterColorSettings;

	const avg = grayScaleFilter(rgb);

	n = avg + (n - avg) * (saturation * 0.01 + 1);
	n *= exposure / 100 + 1;
	n = n >= 128 ? n + contrast : n - contrast;
	n += brightness;
	n = n >= 128 ? n + lights : n;
	n = n < 128 ? n - shadows : n;

	return n;
};

// ****************************************************************************
// 														Files control
// ****************************************************************************

const loadImage = (file: File): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = (error) => reject(error);
		image.src = URL.createObjectURL(file);
	});

export const getImageDataFromFiles = async (
	fileList: FileList
): Promise<ImageEditor[]> => {
	const images: ImageEditor[] = [];

	for (const file of fileList) {
		if (!Object.values(ImageAccepted).includes(file.type as ImageAccepted))
			continue;

		const fileName = file.name;
		const mainImg = await loadImage(file);
		const { height, width } = mainImg;

		images.push({
			tempId: uuid(),
			mainImg,
			modifiedImg: null,
			fileName,
			filterEffect: "none",
			adjustments: defaultAdjustments,
			width,
			height,
			rotation: 0,
			cropX: 0,
			cropY: 0,
			cropOffsetX: width,
			cropOffsetY: height,
			isSelected: false,
		});
	}

	return images;
};

// ****************************************************************************
// 														CTX control
// ****************************************************************************

export const clearCanvas = (canvas: HTMLCanvasElement) => {
	// canvas.width = imageEditor.width;
	// canvas.height = imageEditor.height;
	// const ctx = canvas.getContext("2d");
	// ctx.drawImage(imageEditor.mainImg, 0, 0);
};

// const applyAdjustments = (ctx: CanvasRenderingContext2D, 	imageEditor: ImageEditor) => {

// 	ctx.putImageData(frame, 0, 0);
// };

export const showImage = (
	canvas: HTMLCanvasElement,
	imageEditor: ImageEditor,
	originalQuality = false
) => {
	const { width, height, filterEffect, adjustments } = imageEditor;

	const adjustmentsToSet = adjustments || defaultAdjustments;
	const { temperature } = adjustmentsToSet;

	//todo: colocar un valor manejable para que no se vea tan borroso

	canvas.width = originalQuality ? width : Math.round(width / 8);
	canvas.height = originalQuality ? height : Math.round(height / 8);

	const ctx = canvas.getContext("2d");
	ctx.drawImage(imageEditor.mainImg, 0, 0, canvas.width, canvas.height);

	const original = ctx.getImageData(0, 0, canvas.width, canvas.height);

	const newFrame = new ImageData(canvas.width, canvas.height);
	const data = newFrame.data;

	for (let i = 0; i < newFrame.data.length; i += 4) {
		const rgb = [
			original.data[i + 0],
			original.data[i + 1],
			original.data[i + 2],
		];

		let newRgb = rgb;

		const t = -Math.abs(temperature * 0.0015);
		const temperatureRGB =
			temperature > 0
				? [(0 - newRgb[0]) * t, (100 - newRgb[1]) * t, (200 + newRgb[2]) * t]
				: [(200 + newRgb[0]) * t, (100 - newRgb[1]) * t, (0 - newRgb[2]) * t];

		newRgb = [
			newRgb[0] + temperatureRGB[0],
			newRgb[1] + temperatureRGB[1],
			newRgb[2] + temperatureRGB[2],
		];

		if (filterEffect == "invert")
			newRgb = [
				negativeFilter(rgb[0]),
				negativeFilter(rgb[1]),
				negativeFilter(rgb[2]),
			];

		const options = { ...adjustmentsToSet, rgb: newRgb };

		data[i + 0] = applyColorFilters(newRgb[0], options);
		data[i + 1] = applyColorFilters(newRgb[1], options);
		data[i + 2] = applyColorFilters(newRgb[2], options);
		data[i + 3] = 255;
	}

	ctx.putImageData(newFrame, 0, 0);
};

const exportToBlob = (canva: HTMLCanvasElement): Promise<Blob> =>
	new Promise((resolve, reject) => {
		const a = (b: Blob) => resolve(b);
		canva.toBlob(a, "image/jpeg");
	});

export const generateExportImages = async (
	canva: HTMLCanvasElement,
	imagesEditors: ImageEditor[],
	feedback: (index: number) => void
): Promise<ImageEditor[]> => {
	const toExport: ImageEditor[] = [];

	for (let i = 0; i < imagesEditors.length; i++) {
		if (feedback) feedback(i);

		const item = imagesEditors[i];
		showImage(canva, item, true);

		const img = await exportToBlob(canva);

		if (!img) continue;

		toExport.push({ ...item, modifiedImg: img });
	}

	feedback(-1);

	return toExport;
};
