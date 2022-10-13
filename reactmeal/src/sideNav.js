import { Link } from "react-router-dom";
import Axios from "axios";
import Settings from "./imgs/settings.png"
import AddFriend from "./imgs/addFriend.png"
import Bookmark from "./imgs/bookmark.png"
import Feed from "./imgs/feed.png"


export const SideNav = () => {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    async function bookmarks(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/getRecipes', {
			user: username,
            pass: password,
            recipe: 0
		});
        result = await Axios.post('http://localhost:5000/getRecipes', {
			user: username,
            pass: password,
            recipe: 1
		});
        result = await Axios.post('http://localhost:5000/getIngredients', {
			user: username,
            pass: password
		});
		window.location = "/bookmarks";
    }
    return (
        <>
            <div className="sidenav">
                <Link to="/settings"><img src={Settings}></img></Link>
                <Link to="/addFriend"><img src={AddFriend}></img></Link>
                <button onClick={bookmarks}><img src={Bookmark}/></button>
                <Link to="/feed"><img src={Feed}></img></Link>
            </div>
        </>
    );
}