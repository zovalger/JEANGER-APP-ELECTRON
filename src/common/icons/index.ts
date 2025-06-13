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
import ChevronLeftIcon from "./ChevronLeftIcon";
import ClipboardCheckIcon from "./ClipboardCheckIcon";
import ClipboardCopyIcon from "./ClipboardCopyIcon";
import ToolsIcon from "./ToolsIcon";
import PauseIcon from "./PauseIcon";
import PlayIcon from "./PlayIcon";
import ReplyIcon from "./ReplyIcon";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SwitchHorizontalIcon from "./SwitchHorizontalIcon";
import SearchIcon from "./SearchIcon";

const IconMap: Record<Icons, () => JSX.Element> = {
	Trash: TrashIcon,
	Close: CloseIcon,
	Plus: PlusIcon,
	ChevronDown: ChevronDownIcon,
	ChevronLeft: ChevronLeftIcon,
	DotsVertical: DotsVerticalIcon,
	Edit: EditIcon,
	Menu: MenuIcon,
	Minus: MinusIcon,
	Refresh: RefreshIcon,
	Square: SquareIcon,
	SquareCheck: SquareIcon,
	ClipboardCheck: ClipboardCheckIcon,
	ClipboardCopy: ClipboardCopyIcon,
	Tools: ToolsIcon,
	Pause: PauseIcon,
	Play: PlayIcon,
	Reply: ReplyIcon,
	ShoppingCart: ShoppingCartIcon,
	SwitchHorizontal: SwitchHorizontalIcon,
	Search: SearchIcon,
};

export default IconMap;
