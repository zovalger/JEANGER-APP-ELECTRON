export interface Adjustments {
	brightness: number;
	exposure: number;
	contrast: number;
	lights: number;
	shadows: number;
	saturation: number;
}

export type FilterEffect = "none" | "invert";

export interface ImageEditor {
	_id?: string;
	tempId: string;
	mainImg: HTMLImageElement;
	modifiedImg: ImageData | null;
	fileName: string;
	filterEffect: FilterEffect;
	adjustments: Adjustments | null;
	width: number;
	height: number;
	rotation: number;
	cropX: number;
	cropY: number;
	cropOffsetX: number;
	cropOffsetY: number;
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

export const defaultAdjustments = {
	brightness: 0,
	exposure: 0,
	contrast: 0,
	lights: 0,
	shadows: 0,
	saturation: 0,
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

	const avg = grayScaleFilter(rgb) / 3;
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
			tempId: crypto.randomUUID(),
			mainImg,
			modifiedImg: null,
			fileName,
			filterEffect: "none",
			adjustments: null,
			width,
			height,
			rotation: 0,
			cropX: 0,
			cropY: 0,
			cropOffsetX: width,
			cropOffsetY: height,
		});
	}

	return images;
};

// ****************************************************************************
// 														CTX control
// ****************************************************************************

export const draw = (ctx: CanvasRenderingContext2D, frame: ImageData) => {
	ctx.putImageData(frame, 0, 0);

	return;
};
