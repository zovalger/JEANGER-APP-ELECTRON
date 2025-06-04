const ClipboardCheckIcon = () => {
	return (
		<svg
			className="h-4 w-4"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
			<rect x="9" y="3" width="6" height="4" rx="2" />
			<path d="M9 14l2 2l4 -4" />
		</svg>
	);
};

export default ClipboardCheckIcon;
