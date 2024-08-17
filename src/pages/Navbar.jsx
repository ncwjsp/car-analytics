import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/highlights">Highlights</NavLink>
    </nav>
  );
}

export default Navbar;
