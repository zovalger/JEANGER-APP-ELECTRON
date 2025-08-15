import { Link } from "react-router";
import RouterLinks from "../../common/config/RouterLinks";

import Text from "../../common/components/Text";
import Button from "../../common/components/Button";

const HomeScreen = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen p-4">
			<div className="shadow-md p-4 rounded">
				<Text size="big" variant="bold">
					Inversiones Jeanger C.A.
				</Text>

				<Button href={RouterLinks.Login}>login</Button>
			</div>
		</div>
	);
};

export default HomeScreen;
