import { Link } from "react-router-dom";
import Axios from "axios";
import Settings from "./imgs/settings.png"
import AddFriend from "./imgs/addFriend.png"
import Bookmark from "./imgs/bookmark.png"
import Feed from "./imgs/feed.png"


export const SideNav = () => {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    function settings(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/settings";
        }
    }
    function friends(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/friends";
        }
    }
    async function bookmarks(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest") {
            /*var result = await Axios.post('http://localhost:5000/getRecipes', {
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
		    });*/
		    window.location = "/bookmarks";
        }
    }
    function feed(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/feed";
        }
    }
    return (
        <>
            <div className="sidenav">
                <button onClick={settings}><img src={Settings}/></button>
                <button onClick={friends}><img src={AddFriend}/></button>
                <button onClick={bookmarks}><img src={Bookmark}/></button>
                <button onClick={feed}><img src={Feed}/></button>
            </div>
        </>
    );
}