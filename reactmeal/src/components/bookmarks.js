import { TopNav } from '../topNav';
import Axios from "axios";
import { SideNav } from '../sideNav';
import { useState } from "react";

export const Bookmarks = () => {
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
		await Axios.post('http://localhost:5000/addRecipes', {
            user: username,
            pass: password,
			name: formValue.recipes
		});
	}

    async function addIngredient(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/addIngredients', {
			user: username,
            pass: password,
			name: formValue.ingredients
		});
	}
    
    return (
        <>
            <TopNav/>
            <div id="app">
                Favorite Recipes:<br/>
                <button onClick={getFavoriteRecipes}>Display</button>
            </div>
            <div>
                Personal Recipes:<br/>
                <input type="text" name="recipes" placeholder="Name" onChange={handleChange}></input>
                <button onClick={addRecipes}>Add</button><br/>
                <button onClick={getPersonalRecipes}>Display</button>
            </div>
            <div>
                Pantry:<br/>
                <input type="text" name="ingredients" placeholder="Name" onChange={handleChange}/>
                <button onClick={addIngredient}>Add</button><br/>
                <button onClick={getPantry}>Display</button>
            </div>
            <SideNav/>
        </>
    );
}