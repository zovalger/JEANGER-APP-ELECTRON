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
import IconNotFound from "./IconNotFound";
import ClockIcon from "./ClockIcon";
import EyeIcon from "./EyeIcon";
import EyeOffIcon from "./EyeOffIcon";
import SaveIcon from "./SaveIcon";
import PackageIcon from "./PackageIcon";
import GearIcon from "./GearIcon";
import ImageIcon from "./ImageIcon";

const IconMap: Record<Icons, () => JSX.Element> = {
	icon_not_found: IconNotFound,
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
	Clock: ClockIcon,
	Eye: EyeIcon,
	EyeOff: EyeOffIcon,
	Save: SaveIcon,
	Package: PackageIcon,
	Gear: GearIcon,
	Image: ImageIcon,
};

export default IconMap;
