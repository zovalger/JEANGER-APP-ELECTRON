import { JSX } from "react";
import { Icons } from "../interfaces/icons";
import TrashIcon from "./TrashIcon";
import CloseIcon from "./CloseIcon";
import PlusIcon from "./PlusIcon";
import ChevronDownIcon from "./ChevronDownIcon";
import DotsVerticalIcon from "./DotsVerticalIcon";
import EditIcon from "./EditIcon";
import MenuIcon from "./MenuIcon";
import MinusIcon from "./MinusIcon";
import RefreshIcon from "./RefreshIcon";
import SquareIcon from "./SquareIcon";

const IconMap: Record<Icons, () => JSX.Element> = {
	Trash: TrashIcon,
	Close: CloseIcon,
	Plus: PlusIcon,
	ChevronDown: ChevronDownIcon,
	DotsVertical: DotsVerticalIcon,
	Edit: EditIcon,
	Menu: MenuIcon,
	Minus: MinusIcon,
	Refresh: RefreshIcon,
	Square: SquareIcon,
	SquareCheck: SquareIcon,
};

export default IconMap;
