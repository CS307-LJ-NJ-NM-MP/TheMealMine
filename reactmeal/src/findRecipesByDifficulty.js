import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import { Button, Container, Input, Center } from "@chakra-ui/react";

export const FindByDifficulty = () => {


    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((difficulty) => 
    <li>
        {difficulty}
    </li>
    );

    function sendRequest(e) {
        findRecipe(e);
    }

    const [formValue, setFormValue] = useState({
		difficulty: ''
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
		if(formValue.difficulty !== '') {
            console.log("valid: " + formValue.difficulty);
			var result = await Axios.post('http://localhost:5000/findByDifficulty', {
				difficulty: formValue.difficulty,  
			})
            .then(response => {
                console.log("result: " + response);
                if (response.data.length !== 0) {
                    response.data.sort((a, b) => a.difficulty - b.difficulty)
                    console.log(response.data[0].difficulty)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push("Recipe name: " + response.data[i].name + "; Difficulty: " + response.data[i].difficulty + "\n")
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
            <Container className="difficulty">
                <Center>
                <Input
                    type="text" 
                    placeholder = "Enter difficulty here"
                    name={"difficulty"}
                    variant="flushed"
                    onChange={handleChange('difficulty')}
                />
                <Button onClick={sendRequest} id="categoryButton">Search by Difficulty</Button>
                </Center>
                {recipeItems}
            </Container>
        </>
    );
}

