import { TopNav } from '../topNav';
import Axios from "axios";
import { SideNav } from '../sideNav';
import { useState } from "react";

//export const Bookmarks = () => {
    function Bookmarks() {
    var rName = "Pesto Pasta";

    const [isSaved, setIsSaved] = useState(false);


    //var isSaved = false;

    const handleClick = () => setIsSaved(!isSaved);
    
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if(username == null || password == null){
        window.location = "/";
    }

    async function getFavoriteRecipes(e) {
		e.preventDefault();
		var result = await Axios.post('http://localhost:5000/getRecipes', {
			user: username,
            pass: password,
            recipe: 0
		});
        console.log(result.data);
	}
    
    async function getPersonalRecipes(e) {
		e.preventDefault();
		var result = await Axios.post('http://localhost:5000/getRecipes', {
			user: username,
            pass: password,
            recipe: 1
		});
        console.log(result.data);
	}

    async function addRecipes(e) {
		e.preventDefault();
        window.location = "/recipeAdd";
		/*await Axios.post('http://localhost:5000/addRecipes', {
            user: username,
            pass: password,
			name: formValue.recipes
		});*/
	}

    return (
        <>
            <TopNav/>
            <div id="app">
                Favorite Recipes:<br/>
                <div>
                     { isSaved ? <p></p> : <p>{ rName }</p> } 
                </div>
                <button onClick={getFavoriteRecipes}>Display</button>
            </div>
            <br/>
            <div>
                Personal Recipes:
                <div>
                    <p>{ rName }</p><button onClick={handleClick}> { isSaved ? "Save" : "Unsave" } </button> <button>Edit Recipe</button>
                </div>
                <br/>
                <button onClick={addRecipes}>Add</button><br/>
                <button onClick={getPersonalRecipes}>Display</button>
            </div>
            <SideNav/>
        </>
    );
}

export default Bookmarks;