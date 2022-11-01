import Settings from "./imgs/settings.png"
import AddFriend from "./imgs/addFriend.png"
import Bookmark from "./imgs/bookmark.png"
import Feed from "./imgs/feed.png"
import Axios from "axios";

export const SideNav = () => {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var id = localStorage.getItem('id');
    function settings(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/settings";
        }
    }
    function friends(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/addFriend";
        }
    }
    async function bookmarks(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest") {
            var result = await Axios.post('http://localhost:5000/getRecipes', {
                _id: id
		    }); 
            let favoriteRecipes = [];
            let contributedRecipes = [];
            for(var i = 0; i < result.data.favoriteRecipes.length; i++){
                favoriteRecipes.push(result.data.favoriteRecipes[i]);
            }
            for(var i = 0; i < result.data.contributedRecipes.length; i++){
                contributedRecipes.push(result.data.contributedRecipes[i]);
            }
            localStorage.setItem('favoriteRecipes',favoriteRecipes);
            localStorage.setItem('contributedRecipes',contributedRecipes);
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