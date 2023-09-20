import PNavbar from "../components/Profile/ProfileNavbar";
import { deleteTranslations } from "../utils/deleteTranslations"; // Import the function correctly

const Profile = () => {

    return (
        <div>
            <PNavbar></PNavbar>
            <button onClick={deleteTranslations}>Delete Translations</button>
        </div>
    )
}
export default Profile;
