import PNavbar from "../components/Profile/ProfileNavbar";
import { deleteTranslations } from "../utils/deleteTranslations";

const Profile = () => {
    return (
        <div>
            <PNavbar></PNavbar>
            <h1>Profile</h1>
            <button onClick={deleteTranslations}>Delete Translations</button>
        </div>
    )
}
export default Profile;