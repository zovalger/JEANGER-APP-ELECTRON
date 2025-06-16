import { Link } from "react-router";
import RouterLinks from "../../common/config/RouterLinks";

const HomeScreen = () => {
	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<Link className="p-4" to={RouterLinks.Bills}>bill</Link>
		</div>
	);
};

export default HomeScreen;
