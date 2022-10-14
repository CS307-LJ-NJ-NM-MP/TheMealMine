import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { VStack, StackDivider, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import  Axios  from "axios";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";

export const RecipeAdd = () => {
    let ingredientList = [];
    const [formValue, setFormValue] = useState({
		rName: '',
        ingredients: [], 
		instructions: ''

	})
	
	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
        //let ingredients = event.target.iList;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

    const handleAdd = (event) => {
        let name = event.target.name;
        ingredientList.push(name);
    }

	async function login(e) {
		e.preventDefault();
		if(formValue.user !== '' && formValue.pass !== '') {
			localStorage.setItem('username',formValue.user);
			localStorage.setItem('password',formValue.pass);
			var result = await Axios.post('http://localhost:5000/loginUser', {
				user: formValue.user,  
				pass: formValue.pass
			});
			localStorage.setItem('email',result.data.email);
			localStorage.setItem('image',result.data.image);
			window.location = "/";
		}
	}

    function addIngredient(e){
        e.preventDefault();

    }
	
	function recovery(e) {
		e.preventDefault();
		window.location = '/recovery';
	}
	function signup(e) {
		e.preventDefault();
		window.location = '/signup';
	}
	function guest(e) {
		e.preventDefault();
		localStorage.setItem('username',"Guest");
		localStorage.setItem('password',"Guest");
		window.location = "/";
	}

    return (
        <>
            <TopNav/>
            <div className="login">
                		<form className="loginForm">
							Recipe<br/>
                    		Recipe Name:
                        	<div><input size="15" type="text" name="user" onChange={handleChange}/></div>
                    		Recipe Ingredients:
                        	<div><input size="15"type="text" name="ingredients" onChange={handleAdd}/><button type="submit" onClick={login}>Add</button></div>
                            Recipe Instructions:
                            <div><input size="15"type="text" name="instructions" onChange={handleChange}/></div>
							<div><button type="submit" onClick={login}>Submit</button></div>
                		</form>
           		</div>
            <SideNav/>
        </>
    );
}

//{ show ? "Hide" : "Show" }