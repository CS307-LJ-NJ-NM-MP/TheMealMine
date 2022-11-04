import React, { useState } from "react";
import Axios from "axios";

export const FeedNav = () => {

    function sendRequest(e) {
        console.log("here is a string" + e)
        likePost(e);
    }

    const [userForm, setUserForm] = useState({
        user: ''
	})

    const [recipeForm, setRecipeForm] = useState({
        recipe: ''
    })

    async function likePost(e) {
		e.preventDefault();
        console.log("sending");
        console.log(localStorage.getItem('username'))
        console.log(userForm)
        setUserForm(localStorage.getItem('username'))
        setRecipeForm("Cheese")
        console.log("recipe name: " + recipeForm)
        var result = await Axios.post('http://localhost:5000/idTest', {
            user: localStorage.getItem("username"),
            recipe: recipeForm,
        })
        .then(response => {
            console.log(response.data.likedRecipes)
        })
        .catch(error => {
            console.log(error.data)
            console.log("pain")
            alert("pain")
        })
	}
    return (
        <>
            <div className="feednav">
                <input onClick={sendRequest} type='button' value="Like" id="lButton"/>
            </div>
  
            
        </>
    );
}


