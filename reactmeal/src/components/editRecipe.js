import { TopNav } from '../topNav';
import Axios from "axios";
import { SideNav } from '../sideNav';
import { useState } from "react";

//export const Bookmarks = () => {
    function EditRecipe() {
    var rName = "Pesto Pasta";

    const [isSaved, setIsSaved] = useState(false);


    //var isSaved = false;

    const handleClick = () => setIsSaved(!isSaved);


    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if(username == null || password == null){
        window.location = "/";
    }

    const [formValue, setFormValue] = useState({
		recipes: '',
        ingredients: ''
	})
	
	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
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

    async function getPantry(e) {
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

    const recipeSave = () => {
        return(
            <>
                
            </>
        );
    }

    return (
        <>
            <TopNav/>
            <div id="app">
                Recipe Name:
                Recipe Ingredients:
                Recipe Instructions:
                Recipe Image:
                <button onClick={getPersonalRecipes}>Submit</button>
            </div>
            <SideNav/>
        </>
    );
}

export default Bookmarks;