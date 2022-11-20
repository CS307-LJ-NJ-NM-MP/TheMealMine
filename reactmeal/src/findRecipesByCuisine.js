import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import {Button, Container, Input, Center } from '@chakra-ui/react'

export const FindByCuisine = () => {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");

    function sendRequest(e) {
        findRecipes(e);
        console.log("here is new string" + query)
        setQuery("");
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
                    setQuery(response.data);
                    setTextOut("" + response.data)
                    setQuery("");
                }
                else {
                     setQuery("");
                     setTextOut("");
                     alert("error, user not valid")
                }

            })
            .catch(error => {
                console.log(error.data)
                alert("errors out the ass");
            });
		}
        else {
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
                {textOut}
            </Container>
        </>
    );
}