import { useState } from "react";

const useClipboard = () => {
	const [isCopy, setIsCopy] = useState(false);

	const copyToClipboard = async (text: string) => {
		setIsCopy(true);

		await navigator.clipboard.writeText(text);
		console.log("clipboard:");
		console.log(text);

		setTimeout(() => setIsCopy(false), 800);
	};

	return { isCopy, copyToClipboard };
};

export default useClipboard;
