import { TopNav } from '../topNav';
import { SideNav } from '../sideNav';
import { CategoryNav } from '../categoryNav';
import { Comments } from '../comments';
import React, { useState } from "react";
import Axios from "axios";




export const Feed = () => {

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
        setUserForm(localStorage.getItem('username'))
        setRecipeForm("Ass")
        console.log("recipe name: " + recipeForm)
        var result = await Axios.post('http://localhost:5000/arrayTest', {
            user: userForm,
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



		// if(formValue.user !== '') {
        //     console.log("valid: " + formValue.user);
		// 	var result = await Axios.post('http://localhost:5000/findTheUserReg', {
		// 		user: formValue.user,  
		// 	})
        //     .then(response => {
        //         console.log("result: " + response);
        //         if (response.data.length != 0) {
        //             setQuery(response.data);
        //             setTextOut("" + response.data)
        //             setQuery("");
        //         }
        //         else {
        //              setQuery("");
        //              setTextOut("");
        //              alert("error, user not valid")
        //         }

        //     })
        //     .catch(error => {
        //         console.log(error.data)
        //         alert("errors out the ass");
        //     });
		// }
        // else {
        //     alert ("No query");
        // }
	}

    return (
        <>
            <TopNav/>

            <div className="feednav">
                <input onClick={sendRequest} type='button' value="Like" id="likeButton"/>
            </div>
            
            <SideNav/>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                add category here:
                <br />

            <br />
            <CategoryNav/>


            </div>
            <Comments/>
            
        </>
    );
}