import { Link, NavLink } from "react-router";


const HomeScreen = () => {
	return (
		<div>
		


			home screen

			<NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        dashboard
      </NavLink>
      <br />

      <Link to="/dashboard/bill">bill</Link>
		</div>
	);
};

export default HomeScreen;
