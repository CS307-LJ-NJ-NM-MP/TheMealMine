import React, { useState } from "react";
import Axios from "axios";
import {Button, Container, Input, Center, VStack, 
    Box} from '@chakra-ui/react'

export const FindByAllergens = () => {
    const [finalList, setList] = useState([]);
    const recipeItems = finalList.map((name) => 
        <VStack>
            {name}
        </VStack>
    )
    const blankList = []

    function sendRequest(e) {
        findRecipes(e);
    }

    const [formValue, setFormValue] = useState({
		allergens: ''
	})

    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function findRecipes(e) {
		e.preventDefault();
		if(formValue.allergens !== '') {
			await Axios.post('http://localhost:5000/findByAllergens', {
				allergens: formValue.allergens,  
			}).then(response => {
                if (response.data.length != 0) {
                    response.data.sort((a, b) => a.name - b.name)
                    var recipeArray = []
                    for (var i = 0; i < response.data.length; i++) {
                        var allergenString = ''
                        for (var j = 0; j < response.data[i].allergens.length; j++) {
                            if (j != response.data[i].allergens.length - 1) {
                                allergenString += (response.data[i].allergens[j] + ', ')
                            }
                            else {
                                allergenString += response.data[i].allergens[j]
                            }

                        }
                        recipeArray.push(
                            <Box m="5px 0 5px 0">
                                    <Button w="100%">{response.data[i].name} Allergens: {allergenString}</Button>  
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
                        placeholder = "Enter allergen name"
                        name={"allergens"}
                        variant="flushed"
                        onChange={handleChange('allergens')}
                    />
                    <Button w="200px" onClick={sendRequest} id="allergyButton">Search by allergen</Button>
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