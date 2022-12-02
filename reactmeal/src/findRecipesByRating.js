import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";
import { Button, Box, Input, Center, VStack } from "@chakra-ui/react";

export const FindByRating = () => {
    const blankList = []
    const [finalList, setList] = useState([])
    const recipeItems = finalList.map((rating) => 
        <VStack>
            {rating}
        </VStack>
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

    async function addReccomend(e) {
        //e.preventDefault();
        console.log(e.target.id)
        console.log('username:'+localStorage.getItem('username'))
        var result = await Axios.post('http://localhost:5000/findUser', {
				user: localStorage.getItem('username'),  
			});
        
        var result3 = await Axios.post('http://localhost:5000/findByrating', {
            rating: formValue.rating,  
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
		if(formValue.rating !== '') {
			await Axios.post('http://localhost:5000/findByrating', {
				rating: formValue.rating,  
			})
            .then(response => {
                if (response.data.length !== 0) {
                  //  response.data.sort((a, b) => b.rating - a.rating)
                    console.log(response.data[0].rating)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push(
                            <Box m="5px 0 5px 0">
                                    <Button id={i} onClick={addReccomend}>{response.data[i].name} Rating: {response.data[i].rating}</Button>    
                            </Box>
                        );
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
   
    return (
        <>
            <Box w="100%">
                <Center>
                <Input m="0 5px 0 0" w="200px" type="text" 
                        placeholder = "Enter rating here"
                        name={"rating"}
                        variant="flushed"
                        onChange={handleChange('rating')}
                    />
                <Button w="200px" onClick={sendRequest} id="categoryButton">Search by Rating</Button>
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

