import { Link } from "react-router-dom";
import HomeLogo from "./imgs/homeLogo.png"
import guestLogo from "./imgs/guestLogo.png"

export const TopNav = () => {
    return (
        <>
            <div className="topnav">
                <Link to="/"><img src={ HomeLogo} className="projLogo" alt="logo"></img></Link>
                <Link to="/"><h2>The Meal Mine</h2></Link>
                <Link to="/login"><p>Log In</p></Link>
            </div>

        </>
    );
}