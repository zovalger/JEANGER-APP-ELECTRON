import { Link } from "react-router";
import RouterLinks from "../../common/config/RouterLinks";

import Text from "../../common/components/Text";
import Button from "../../common/components/Button";

const HomeScreen = () => {
	return (
		<>
			<Text size="big">inversiones jeanger </Text>
			<Text>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
				aspernatur voluptatum possimus? Id placeat eius aliquam voluptas sequi
				vero reiciendis quidem, ea nam temporibus porro saepe consequuntur nobis
				quae.
			</Text>

			<Button href={RouterLinks.Login}>login</Button>
		</>
	);
};

export default HomeScreen;
