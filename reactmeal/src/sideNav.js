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
            window.location = "/friends";
        }
    }
    async function bookmarks(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest") {
            var result = await Axios.post('http://localhost:5000/getRecipes', {
                _id: id
		    }); 
            let favoriteRecipes = [];
            for(var i = 0; i < result.data.favoriteRecipes.length; i++){
                let temp = [];
                temp.push(result.data.favoriteRecipes[i][4]);
                temp.push(result.data.favoriteRecipes[i][3]);
                temp.push(result.data.favoriteRecipes[i][2]);
                temp.push(result.data.favoriteRecipes[i][1]);
                temp.push(result.data.favoriteRecipes[i][6]);
                favoriteRecipes.push(temp);
            }
            let contributedRecipes = [];
            console.log(contributedRecipes);
            for(var i = 0; i < result.data.personalRecipes.length; i++){
                let temp = [];
                temp.push(result.data.personalRecipes[i][4]);
                temp.push(result.data.personalRecipes[i][3]);
                temp.push(result.data.personalRecipes[i][2]);
                temp.push(result.data.personalRecipes[i][1]);
                temp.push(result.data.personalRecipes[i][6]);
                contributedRecipes.push(temp);
            }
            console.log(favoriteRecipes);
            console.log(contributedRecipes);
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
}