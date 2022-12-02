import React, { useState } from "react";
import Axios from "axios";
import {Button, Container, Input, Center, VStack, 
    Box} from '@chakra-ui/react'

export const FindByAllergens = () => {
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
                            <Box m="5px 0 5px 0" w="90%">
                                <Center>
                                    <Button id={i} onClick={addReccomend} w="100%">Recipe Name: {response.data[i].name} Allergens: {allergenString}</Button>
                                </Center>    
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
            <Box padding="5px" w="100%">
                {recipeItems}
            </Box>
        </>
    );
}