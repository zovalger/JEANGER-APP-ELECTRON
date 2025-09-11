import { useRef, useState } from "react";
import {
	Adjustments,
	clearCanvas,
	Crop,
	defaultAdjustments,
	defaultCrop,
	FilterEffect,
	generateExportImages,
	getImageDataFromFiles,
	ImageEditor,
	showImage,
} from "../helpers/ImageEditor.helper";

import { SelectMode } from "../../common/enums/SelectMode.enum";

const usePhotoEditorWeb = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imagesUploaded, setImagesUploaded] = useState<ImageEditor[]>([]);
	const [currentAdjustments, setCurrentAdjustments] =
		useState<Adjustments>(defaultAdjustments);
	const [currentCrop, setCurrentCrop] = useState<Crop>(defaultCrop);

	const [fileInView, setFileInView] = useState<string | null>(null);

	const [currentZoom, setZoom] = useState(100);

	const handleAdjustmentsChange = (adjustments: Adjustments) => {
		setCurrentAdjustments(adjustments);

		setImagesUploaded((prev) =>
			prev.map((i) => (i.isSelected ? { ...i, adjustments } : i))
		);
	};

	const handleCropChange = (crop: Crop) => {
		if (!canvasRef.current) return;
		setCurrentCrop(crop);

		setImagesUploaded((prev) => {
			const newList = prev.map((i) => (i.isSelected ? { ...i, crop } : i));

			drawCanvas({ list: newList });

			return newList;
		});
	};

	const uploadFiles = async (files: FileList) => {
		try {
			const images = await getImageDataFromFiles(files);
			setImagesUploaded(images);
			drawCanvas({ img: images[0] });
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};
	interface DrawOptions {
		img?: ImageEditor;
		zoom?: number;
		list?: ImageEditor[];
	}

	const drawCanvas = (options: DrawOptions = {}) => {
		if (!canvasRef.current) return;

		const { img, zoom, list } = options;

		let imgToView: ImageEditor | null = img;

		if (!imgToView && list)
			imgToView = list.find((i) => i.tempId == fileInView || i.isSelected);

		if (!imgToView && !list)
			imgToView = imagesUploaded.find(
				(i) => i.tempId == fileInView || i.isSelected
			);

		if (!imgToView) return clearCanvas(canvasRef.current);

		showImage(canvasRef.current, imgToView, { zoom: zoom || currentZoom });
	};

	const applyZoom = (z: number) => {
		if (!canvasRef.current) return;
		setZoom(z);
		drawCanvas({ zoom: z });
	};

	const selectImageByMode = async (type: SelectMode, tempId?: string) =>
		setImagesUploaded((prev) => {
			let newSelecteds: ImageEditor[] = [];

			if (type == SelectMode.all)
				newSelecteds = prev.map((i) => ({ ...i, isSelected: true }));

			if (type == SelectMode.impar)
				newSelecteds = prev.map((i, index) => ({
					...i,
					isSelected: !(index % 2),
				}));

			if (type == SelectMode.par)
				newSelecteds = prev.map((i, index) => ({
					...i,
					isSelected: !!(index % 2),
				}));

			if (type == SelectMode.invertSelect)
				newSelecteds = prev.map((i) => ({
					...i,
					isSelected: !i.isSelected,
				}));

			if (type == SelectMode.one && tempId)
				newSelecteds = prev.map((i) => ({
					...i,
					isSelected: tempId == i.tempId,
				}));

			const visible = newSelecteds.find((i) => i.isSelected);

			if (visible) {
				drawCanvas({ img: visible });
				setFileInView(tempId);
				setCurrentAdjustments(visible.adjustments);
			} else {
				clearCanvas(canvasRef.current);
			}

			return newSelecteds;
		});

	const changeSelectMark = (tempId: string, isSelected: boolean) =>
		setImagesUploaded((prev) =>
			prev.map((i) => (tempId == i.tempId ? { ...i, isSelected } : i))
		);

	const SetFilterEffect = (
		filterEffect: FilterEffect,
		adjustments: Adjustments
	) => {
		setCurrentAdjustments(adjustments);

		setImagesUploaded((prev) =>
			prev.map((i) => (i.isSelected ? { ...i, adjustments, filterEffect } : i))
		);

		drawCanvas();
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
							// clearCanvas(canvasRef.current);
						} else {
							selectImageByMode(SelectMode.one, imagesUploaded[toIndex].tempId);
						}

						URL.revokeObjectURL(item.mainImg.src);
					}
				}

				return item.tempId != tempId;
			})
		);
	};

	const rotateImg = (r: number) => {
		if (!canvasRef.current) return;

		setImagesUploaded((prev) => {
			const newList = prev.map((i) => {
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

			drawCanvas({ img: newList.find((i) => i.isSelected) });

			return newList;
		});
	};

	const [isExporting, setIsExporting] = useState(false);

	const generateExport = async (
		quality: number,
		callback: (msg: string, success: boolean, error: boolean) => void
	) => {
		if (isExporting) {
			throw new Error("Ya se está exportando, espera un momento");
		}

		setIsExporting(true);

		const result = await generateExportImages(
			canvasRef.current,
			imagesUploaded,
			quality,
			(i) => {
				if (i < 0) return callback("Render finalizado", true, false);

				callback("procesando: " + imagesUploaded[i].fileName, false, false);
			}
		);

		setIsExporting(false);

		return result;
	};

	return {
		canvasRef,
		currentAdjustments,
		handleAdjustmentsChange,
		currentCrop,
		handleCropChange,
		imagesUploaded,
		uploadFiles,
		changeSelectMark,
		selectImageByMode,
		SetFilterEffect,
		deleteImage,
		rotateImg,
		generateExport,
		isExporting,
		zoom: currentZoom,
		applyZoom,
	};
};

export default usePhotoEditorWeb;
