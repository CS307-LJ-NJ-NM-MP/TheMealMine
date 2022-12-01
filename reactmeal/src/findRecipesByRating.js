import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import { Button, Container, Input, Center } from "@chakra-ui/react";

export const FindByRating = () => {


    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((rating) => 
    <li>
        {rating}
    </li>
    );

    function sendRequest(e) {
        findRecipe(e);
    }

    const [formValue, setFormValue] = useState({
		rating: ''
	})

    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function findRecipe(e) {
		e.preventDefault();
        console.log("sending");
		if(formValue.rating !== '') {
            console.log("valid: " + formValue.rating);
			var result = await Axios.post('http://localhost:5000/findByrating', {
				rating: formValue.rating,  
			})
            .then(response => {
                console.log("result: " + response);
                if (response.data.length !== 0) {
                    response.data.sort((a, b) => b.rating - a.rating)
                    console.log(response.data[0].rating)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push("Recipe name: " + response.data[i].name + "; Rating: " + response.data[i].rating + "\n")
                    }
                    setList(recipeArray);
                }
                else {
                    setList(blankList)
                    alert("enter input between 1 and 5")
                }

            })
            .catch(error => {
                console.log(error.data)
                alert("error");
            });
		}
        else {
            setList(blankList)
            alert ("No query");
        }
	}
   
    return (
        <>
            <Container className="rating">
                <Center>
                <Input
                    type="text" 
                    placeholder = "Enter rating here"
                    name={"rating"}
                    variant="flushed"
                    onChange={handleChange('rating')}
                />
                <Button onClick={sendRequest} id="categoryButton">Search by Rating</Button>
                </Center>
                {recipeItems}
            </Container>
        </>
    );
}

