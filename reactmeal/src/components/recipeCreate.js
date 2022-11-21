import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { VStack, StackDivider, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import  Axios  from "axios";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
var ingredients = [];
export const RecipeAdd = () => {
    
    const [formValue, setFormValue] = useState({
		rName: '',
		add: '',
		instructions: '',
		ingred: [],
		image: '',
		time: ''
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

    function handleList(e) {
        e.preventDefault();
		ingredients.push(formValue.add);
        console.log(ingredients);
	}

    

	async function addRecipe(e) {
		e.preventDefault();
        formValue.ingred = ingredients;
        ingredients = [];
		window.location = '/bookmarks';
		await Axios.post('http://localhost:5000/addRecipe', {
			name: formValue.rName,
			user: formValue.user,
           	ingredients: formValue.ingredients,
			instructions: formValue.instructions,
			image: formValue.image,
			time: formValue.time
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
                        	<div><input size="15"type="text" name="add" onChange={handleChange}/><button type="submit" onClick={handleList}>Add</button></div>
                            Recipe Instructions:
                            <div><input size="15"type="text" name="instructions" onChange={handleChange}/></div>
							Prep Time:
							<div><input size="15"type="text" name="prep time" onChange={handleChange}/></div>
                            Image:
                            <div><input size="15"type="text" name="image" onChange={handleChange}/></div>
							<div><button type="submit" onClick={addRecipe}>Submit</button></div>
                		</form>
           		</div>
            <SideNav/>
        </>
    );
}