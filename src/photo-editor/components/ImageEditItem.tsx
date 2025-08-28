import IconButton from "../../common/components/IconButton";
import Text from "../../common/components/Text";
import { ImageEditor } from "../helpers/ImageEditor.helper";

interface props {
	data: ImageEditor;
	onClick: (tempId: string) => void;
	onDelete: (tempId: string) => void;
	onClickCheck: (tempId: string, toSelect: boolean) => void;
}

const ImageEditItem = (props: props) => {
	const { data, onClick, onDelete, onClickCheck } = props;
	const { tempId, isSelected, mainImg, fileName, rotation } = data;

	return (
		<div
			className="flex flex-col max-w-32 h-full shrink-0 shadow px-2 pt-2 pb-1 rounded bg-white"
			onClick={() => onClick(tempId)}
		>
			<div className="flex">
				<IconButton
					size="tiny"
					icon={isSelected ? "SquareCheck" : "Square"}
					onClick={() => onClickCheck(tempId, !isSelected)}
				/>
			</div>
			<div className=" flex-1 flex justify-center rounded overflow-hidden">
				<img
					className="h-full w-auto"
					key={tempId}
					src={mainImg.src}
					alt={fileName}
				/>
			</div>

			<div className="flex">
				<Text className="flex overflow-hidden text-nowrap">{rotation}°</Text>
			</div>

			<div className="flex">
				<Text className="flex overflow-hidden text-nowrap">{fileName}</Text>

				<IconButton
					icon="Close"
					className="ml-auto"
					size="tiny"
					onClick={() => onDelete(tempId)}
				/>
			</div>
		</div>
	);
};

export default ImageEditItem;
