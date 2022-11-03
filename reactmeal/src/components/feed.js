import { TopNav } from '../topNav';
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'
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
        console.log(userForm)
        setUserForm(localStorage.getItem('username'))
        setRecipeForm("Cheese")
        console.log("recipe name: " + recipeForm)
        var result = await Axios.post('http://localhost:5000/arrayTest', {
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

    return (<>
        <Container maxW="80%">
            <TopNav/><br/>
            <CategoryNav/><br/>
            <Comments/><br/>
            <Center>
                <Button id="likeButton" type='submit' width="200px" onClick={sendRequest}>Like</Button>
            </Center>
        </Container>
    </>);
}