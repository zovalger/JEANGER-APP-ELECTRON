export interface FilterColorSettings {
	brightness: number;
	exposure: number;
	contrast: number;
	lights: number;
	shadows: number;
	saturation: number;
	rgb: number[];
}

export const applyColorFilters = (
	n: number,
	filterColorSettings: FilterColorSettings
) => {
	const { brightness, exposure, contrast, lights, saturation, shadows, rgb } =
		filterColorSettings;

	const avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
	n = avg + (n - avg) * (saturation * 0.01 + 1);
	n *= exposure / 100 + 1;
	n = n >= 128 ? n + contrast : n - contrast;
	n += brightness;
	n = n >= 128 ? n + lights : n;
	n = n < 128 ? n - shadows : n;

	return n;
};
