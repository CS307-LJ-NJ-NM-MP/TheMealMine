import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import { Button, Container, Input, Center } from "@chakra-ui/react";

export const FindByPrepTime = () => {


    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((prepTime) => 
    <li>
        {prepTime}
    </li>
    );

    function sendRequest(e) {
        findRecipe(e);
    }

    const [formValue, setFormValue] = useState({
		prepTime: ''
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
		if(formValue.prepTime !== '') {
            console.log("valid: " + formValue.prepTime);
			var result = await Axios.post('http://localhost:5000/findByPrepTime', {
				prepTime: formValue.prepTime,  
			})
            .then(response => {
                console.log("result: " + response);
                if (response.data.length !== 0) {
                    response.data.sort((a, b) => a.prepTime - b.prepTime)
                    console.log(response.data[0].prepTime)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("time: " + response.data[i].prepTime)
                        if (response.data[i].prepTime == 1) {
                            recipeArray.push("Recipe name: " + response.data[i].name + "; Prep Time: " + response.data[i].prepTime + " hr \n")
                        }
                        else if (response.data[i].prepTime < 1) {
                            var timeInMins = response.data[i].prepTime * 60
                            recipeArray.push("Recipe name: " + response.data[i].name + "; Prep Time: " + timeInMins + " mins \n")
                        }
                        else {
                            recipeArray.push("Recipe name: " + response.data[i].name + "; Prep Time: " + response.data[i].prepTime + " hrs \n")
                        }
                    }
                    setList(recipeArray);
                }
                else {
                    setList(blankList)
                    alert("Prep time has to be greater than 0")
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
            <Container className="prepTime">
                <Center>
                <Input
                    type="text" 
                    placeholder = "Enter prep time in hours"
                    name={"prepTime"}
                    variant="flushed"
                    onChange={handleChange('prepTime')}
                />
                <Button onClick={sendRequest} id="categoryButton">Search by prepTime</Button>
                </Center>
                {recipeItems}
            </Container>
        </>
    );
}

