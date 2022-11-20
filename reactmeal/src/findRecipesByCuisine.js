import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import {Button, Container, Input, Center } from '@chakra-ui/react'

export const FindByCuisine = () => {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");
    const [finalList, setList] = useState([]);
    const recipeItems = finalList.map((name) => 
        <li>
            {name}
        </li>
    )
    const blankList = []

    function sendRequest(e) {
        findRecipes(e);
        console.log("here is new string" + query)
    }

    const [formValue, setFormValue] = useState({
		cuisine: ''
	})

    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function findRecipes(e) {
		e.preventDefault();
        console.log("sending");
		if(formValue.cuisine !== '') {
            console.log("valid: " + formValue.cuisine);
			var result = await Axios.post('http://localhost:5000/findByCuisine', {
				cuisine: formValue.cuisine,  
			})
            .then(response => {
                console.log("result: " + response);
                if (response.data.length != 0) {
                    response.data.sort((a, b) => a.name - b.name)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push(response.data[i].name)
                        console.log("name " + response.data[i].name)
                    }
                    setList(recipeArray)
                }
                else {
                    setList(blankList)
                    alert("error")
                }

            })
            .catch(error => {
                console.log(error.data)
                alert("errors out the ass");
            });
		}
        else {
            setList(blankList)
            alert ("No query");
        }
	}
   
    return (
        <>
            <Container className="cuisine">
                <Center>
                <Input
                    type="text" 
                    placeholder = "Enter cuisine name"
                    name={"cuisine"}
                    variant="flushed"
                    onChange={handleChange('cuisine')}
                />
                <Button onClick={sendRequest} id="categoryButton">Search by Cuisine</Button>
                </Center>
                {recipeItems}
            </Container>
        </>
    );
}