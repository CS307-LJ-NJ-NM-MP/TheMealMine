import { Link } from "react-router-dom";
import Settings from "./imgs/settings.png"
import AddFriend from "./imgs/addFriend.png"
import Bookmark from "./imgs/bookmark.png"
import Feed from "./imgs/feed.png"


export const SideNav = () => {
    return (
        <>
            <div className="sidenav">
                <Link to="/settings"><img src={Settings}></img></Link>
                <Link to="/addFriend"><img src={AddFriend}></img></Link>
                <Link to="/bookmarks"><img src={Bookmark}></img></Link>
                <Link to="/feed"><img src={Feed}></img></Link>
            </div>
        </>
    );
}