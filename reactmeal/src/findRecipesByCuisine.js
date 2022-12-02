import React, { useState } from "react";
import Axios from "axios";
import {Button, Container, Input, Center, VStack, 
    Box} from '@chakra-ui/react'

export const FindByCuisine = () => {
    const [finalList, setList] = useState([]);
    const recipeItems = finalList.map((name) => 
        <VStack w="80%">
            {name}
        </VStack>
    )
    const blankList = []

    function sendRequest(e) {
        findRecipes(e);
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

    async function findRecipes(e) {
		e.preventDefault();
		if(formValue.cuisine !== '') {
			await Axios.post('http://localhost:5000/findByCuisine', {
				cuisine: formValue.cuisine,  
			}).then(response => {
                if (response.data.length != 0) {
                    response.data.sort((a, b) => a.name - b.name)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        recipeArray.push(
                            <Box m="5px 0 5px 0">
                                    <Button id={i} onClick={addReccomend}>{response.data[i].name}</Button>
                                
                            </Box>
                        );
                    }
                    setList(recipeArray)
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
                        placeholder = "Enter cuisine name"
                        name={"cuisine"}
                        variant="flushed"
                        onChange={handleChange('cuisine')}
                    />
                    <Button w="200px" onClick={sendRequest} id="categoryButton">Search by Cuisine</Button>
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