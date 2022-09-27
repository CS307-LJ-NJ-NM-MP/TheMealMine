import { Link } from "react-router-dom";
import HomeLogo from "./homeLogo.png"
import guestLogo from "./guestLogo.png"

export const TopNav = () => {
    return (
        <>
            <div className="topnav">
                <img src={ HomeLogo} className="projLogo" alt="logo"></img>
                <h2>The Meal Mine</h2>
                <p>Log In</p>
            </div>

        </>
    );
}