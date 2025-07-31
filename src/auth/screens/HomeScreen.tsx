// import { Link } from "react-router";
// import RouterLinks from "../../common/config/RouterLinks";

import Button from "../../common/components/Button";
import Input from "../../common/components/Input";

const HomeScreen = () => {



	
	return (
		<form className="flex flex-col justify-center items-center h-screen w-screen">
			<Input placeholder="correo" />
			<Input placeholder="contraseña" type="password" />
			<Button className="w-full">Login</Button>
			{/* <Link className="p-4" to={RouterLinks.Bills}>bill</Link> */}
		</form>
	);
};

export default HomeScreen;
