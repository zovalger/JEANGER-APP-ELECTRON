import { Link, NavLink } from "react-router";
import RouterLinks from "../../common/config/RouterLinks";


const HomeScreen = () => {
	return (
		<div>
		


			home screen

			<NavLink
       to={RouterLinks.Dashboard}
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        dashboard
      </NavLink>
      <br />

      <Link to={RouterLinks.Bills}>bill</Link>
		</div>
	);
};

export default HomeScreen;
