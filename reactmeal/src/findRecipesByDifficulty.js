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

    async function addReccomend(e) {
        //e.preventDefault();
        console.log(e.target.id)
        console.log('username:'+localStorage.getItem('username'))
        var result = await Axios.post('http://localhost:5000/findUser', {
				user: localStorage.getItem('username'),  
			});
        
        var result3 = await Axios.post('http://localhost:5000/findByCuisine', {
            cuisine: formValue.cuisine,  
        });

        var recentsUsername = localStorage.getItem('username')
        var recipeName = result3.data[e.target.id].name

        var result4 = await Axios.post('http://localhost:5000/addToRecents', {
            user: recentsUsername,
            recentlyViewed: recipeName
        })

        console.log('results:'+ result4.data.recentlyViewed);

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
                            <Box m="5px 0 5px 0">
                                <Button id={i} onClick={addReccomend}>{response.data[i].name} Difficulty: {response.data[i].difficulty}</Button>        
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
                <VStack m="10px 10px 10px 10px" maxH="150px" overflow="hidden" overflowY="scroll"
                    sx={{
                        '&::-webkit-scrollbar': {
                        width: '0px',
                        backgroundColor: `transparent`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `transparent`,
                        },
                    }}>
                    {recipeItems}
                </VStack>
            </Box>
        </>
    );
}

