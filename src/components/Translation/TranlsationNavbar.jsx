import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(
        <div>
            <h2>Lost in Translation</h2>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    )
}
export default Navbar