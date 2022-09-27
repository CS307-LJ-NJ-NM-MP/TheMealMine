import { Link } from "react-router-dom";
import Settings from "./settings.png"
import AddFriend from "./addFriend.png"
import Bookmark from "./bookmark.png"
import Feed from "./feed.png"


export const SideNav = () => {
    return (
        <div className="sidenav">
            <img src={Settings}></img>
            <img src={AddFriend}></img>
            <img src={Bookmark}></img>
            <img src={Feed}></img>
        </div>
    );
}