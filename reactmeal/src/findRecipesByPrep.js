import React, { useState } from "react";
import Axios from "axios";
import { Button, Box, Input, Center, VStack } from "@chakra-ui/react";

export const FindByPrepTime = () => {


    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((prepTime) => 
        <VStack>
            {prepTime}
        </VStack>
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

    async function addReccomend(e) {
        //e.preventDefault();
        console.log(e.target.id)
        console.log('username:'+localStorage.getItem('username'))
        var result = await Axios.post('http://localhost:5000/findUser', {
				user: localStorage.getItem('username'),  
			});
        
        var result3 = await Axios.post('http://localhost:5000/findByPrepTime', {
            prepTime: formValue.prepTime,  
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
		if(formValue.prepTime !== '') {
			await Axios.post('http://localhost:5000/findByPrepTime', {
				prepTime: formValue.prepTime,  
			})
            .then(response => {
                if (response.data.length !== 0) {
//                    response.data.sort((a, b) => a.prepTime - b.prepTime)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].prepTime == 1) {
                            recipeArray.push(
                                <Box m="5px 0 5px 0" w="90%">
                                    <Center>
                                        <Button id={i} onClick={addReccomend} w="100%">{response.data[i].name} Prep Time: {response.data[i].prepTime} </Button>
                                    </Center>    
                                </Box>
                            );
                        }
                        else if (response.data[i].prepTime < 1) {
                            var timeInMins = response.data[i].prepTime * 60
                            recipeArray.push(
                                <Box m="5px 0 5px 0" w="90%">
                                    <Center>
                                        <Button id={i} onClick={addReccomend} w="100%">{response.data[i].name} Prep Time: {timeInMins} mins</Button>
                                    </Center>    
                                </Box>  
                            );
                        }
                        else {
                            recipeArray.push(
                                <Box m="5px 0 5px 0">
                                    <Button id={i} onClick={addReccomend}>{response.data[i].name} Prep Time: {response.data[i].prepTime} hrs</Button>    
                                </Box>
                            );
                        }
                    }
                    setList(recipeArray);
                }
                else {
                    setList(blankList);
                }

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
                        placeholder = "Enter prep time (hrs)"
                        name={"prepTime"}
                        variant="flushed"
                        onChange={handleChange('prepTime')}
                    />
            <Button w="200px" onClick={sendRequest} id="categoryButton">Search by prepTime</Button>
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

