import React, { useState } from "react";
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'
//import Data from "../src/mockdata.json"
import Axios from "axios";

export function CategoryNav () {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");

    function sendRequest(e) {
        addCategory(e);
        console.log("here is new string" + query)
        setQuery("");
    }

    const [userForm, setUserForm] = useState({
		user: ''
	})

    const [categoryForm, setCategoryForm ] = useState({
        category: ''
    })

    const handleChange = name => event => {
		setCategoryForm((prevState) => {
			return {
                ...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function addCategory(e) {
		e.preventDefault();
        setUserForm(localStorage.getItem('username'))
        console.log(userForm)
        console.log(categoryForm.category)
        console.log("sending");
		if(categoryForm.category !== '') {
            console.log("valid: " + categoryForm.category);
			var result = await Axios.post('http://localhost:5000/addCategory', {
				user: localStorage.getItem('username'),  
                recipe: "Milk",
                category: categoryForm.category
			})
            .then(response => {
                console.log("result: " + response.categories);
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
            <Container className="categorynav">
                <Center>
                <Input
                    type="text" 
                    placeholder = "Enter category here"
                    name={"user"}
                    variant="flushed"
                    onChange={handleChange('category')}
                />
                <Button onClick={sendRequest} id="categoryButton">Add Category</Button>
                </Center>
                {textOut}
            </Container>
        </>
    );


}
