import { Route } from "react-router";
import PhotoEditorScreen from "../screens/PhotoEditorScreen";

const PhotoEditorRoutes = () => {
	return (
		<Route path="photo-editor">
			<Route index element={<PhotoEditorScreen />} />
		</Route>
	);
};

export default PhotoEditorRoutes;
