import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { VStack, StackDivider, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import  Axios  from "axios";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";

export const RecipeAdd = () => {
    const [formValue, setFormValue] = useState({
		rName: '',
		ingredients: [],
        input: '',
		instructions: '',
		image: ''
	})
	
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

	async function addUser(e) {
		e.preventDefault();
		//window.location = '/bookmarks';
        console.log(formValue);
		await Axios.post('http://localhost:5000/signupUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email,
			image: formValue.image
		});
	}

    return (
        <>
            <TopNav/>
            <div className="login">
                		<form className="loginForm">
							Recipe<br/>
                    		Recipe Name:
                        	<div><input size="15" type="text" name="rName" onChange={handleChange}/></div>
                    		Recipe Ingredients:
                        	<div><input size="15"type="text" name="ingredients" onChange={handleChange}/><button type="submit" onClick={addUser}>Add</button></div>
                            Recipe Instructions:
                            <div><input size="15"type="text" name="instructions" onChange={handleChange}/></div>
                            <div><input size="15"type="text" name="image" onChange={handleChange}/></div>
							<div><button type="submit" onClick={addUser}>Submit</button></div>
                		</form>
           		</div>
            <SideNav/>
        </>
    );
}

//{ show ? "Hide" : "Show" }