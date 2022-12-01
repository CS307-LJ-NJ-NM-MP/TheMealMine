import React, { useState } from "react";
import Axios from "axios";
import { Button, Input, Center, VStack, 
    Box} from "@chakra-ui/react";

export const FindByDifficulty = () => {
    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((difficulty) => 
        <VStack>
            {difficulty}
        </VStack>
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
			await Axios.post('http://localhost:5000/findByDifficulty', {
				difficulty: formValue.difficulty,  
			}).then(response => {
                console.log("result: " + response);
                if (response.data.length !== 0) {
                    response.data.sort((a, b) => a.difficulty - b.difficulty)
                    console.log(response.data[0].difficulty)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push(
                            <Box m="5px 0 5px 0" w="90%">
                                <Center>
                                    <Button w="100%">{response.data[i].name} Difficulty: {response.data[i].difficulty}</Button>
                                </Center>    
                            </Box>
                        );
                    }
                    setList(recipeArray);
                }
                else {
                    setList(blankList)
                }

            }).catch(error => {
                console.log(error.data);
            });
		}
        else {
            setList(blankList);
        }
	}
   
    return (<>
            <Box w="100%">
                <Center>
                <Input m="0 5px 0 0" w="200px" type="text" 
                        placeholder = "Enter Difficulty"
                        name={"difficulty"}
                        variant="flushed"
                        onChange={handleChange('difficulty')}
                    />
                <Button w="200px" onClick={sendRequest} id="categoryButton">Search by Difficulty</Button>
                </Center>
            </Box>
            <Box padding="5px">
                {recipeItems}
            </Box>
        </>
    );
}

