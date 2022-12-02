import React, { useState } from "react";
import { Box, Center, Container, FormLabel, VStack,
    Button, Divider, Textarea} from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { FindByDifficulty } from '../findRecipesByDifficulty';
import { FindByCuisine } from '../findRecipesByCuisine';
import { FindByPrepTime } from "../findRecipesByPrep";
import searchBackground from '../imgs/searchBackground.jpg'
import { FindByRating } from '../findRecipesByRating'
import { FindByAllergens } from '../findRecipesByAllergens'
import { FindByPantry } from '../findRecipesByPantry';

import Axios from "axios";


function SearchRecipes() {  
   
    //const [finalList, setList] = useState([]);
    const [recipeItems, setRecipeItems] = useState([])

    async function loadReccommend(){
        var result = await Axios.post('http://localhost:5000/findUser', {
            user: localStorage.getItem('username'),  
        });

        var finalArr = []; 
        for (var i = 0; i < result.data.recentlyViewed.length; i++) {
            finalArr.push(result.data.recentlyViewed[i])
        }

        setRecipeItems(finalArr)
        console.log(recipeItems)


    }

    return(
        <Container
            maxW = '100%'
            h='calc(100vh)'
            backgroundRepeat="no-repeat"
            bgSize="100%"
            backgroundImage={searchBackground}
            align="center"
        >
            <TopNav/>      
            <Box 
                m="20px"
                bg="white"
                borderRadius='lg'
                w="50%"
                h="500px"
                padding="20px"
                >
                <Center>
                    <Box h="500px">
                        <VStack maxH="450px" overflow="hidden" overflowY="scroll"
                            sx={{
                                '&::-webkit-scrollbar': {
                                width: '0px',
                                backgroundColor: `transparent`,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                backgroundColor: `transparent`,
                                },
                            }}>
                            <FormLabel>Recipe Searching</FormLabel>
                            <FindByDifficulty/>
                            <FindByCuisine/>
                            <FindByPrepTime/>
                            <FindByRating/>
                            <FindByAllergens/>
                        </VStack>
                    </Box>
                    <Box m="0 0 0 20px" h="500px">
                        <VStack maxH="450px" overflow="hidden" overflowY="scroll"
                            sx={{
                                '&::-webkit-scrollbar': {
                                width: '0px',
                                backgroundColor: `transparent`,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                backgroundColor: `transparent`,
                                },
                            }}>
                            <FormLabel>Recommended Recipes</FormLabel>
                            {recipeItems}
                            <Button onClick={loadReccommend}  w="200px">Recipe 1</Button>
                            <Textarea size='lg' placeholder={recipeItems}></Textarea>
                        
                            
                        </VStack>
                    </Box>
                </Center>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default SearchRecipes;

