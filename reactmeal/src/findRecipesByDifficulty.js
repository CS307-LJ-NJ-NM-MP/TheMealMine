import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import { Button, Container, Input, Center } from "@chakra-ui/react";

export const FindByDifficulty = () => {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");

    function sendRequest(e) {
        findRecipe(e);
        setQuery("");
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
                    setQuery(response.data);
                    setTextOut("" + response.data)
                    setQuery("");
                }
                else {
                     setQuery("");
                     setTextOut("");
                     alert("error, input not valid")
                }

            })
            .catch(error => {
                console.log(error.data)
                alert("error");
            });
		}
        else {
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
                {textOut}
            </Container>
        </>
    );
}

