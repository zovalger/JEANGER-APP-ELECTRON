import { createRoot } from "react-dom/client";
import "./index.css";
import BillScreen from "./bills/screens/BillScreen";

const root = createRoot(document.body);

root.render(
	<>
		<BillScreen />
	</>
);
