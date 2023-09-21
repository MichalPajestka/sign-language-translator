import { NavLink } from "react-router-dom"

const TNavbar = () => {
    return(
        <div>
            <h2>Sign Language Translator</h2>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    )
}
export default TNavbar