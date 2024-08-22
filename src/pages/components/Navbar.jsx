import { NavLink } from "react-router-dom";
import "./style/Navbar.css";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/highlights">Highlights</NavLink>
    </nav>
  );
}

export default Navbar;
