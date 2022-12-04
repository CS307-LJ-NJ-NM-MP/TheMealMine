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
    let recommended = localStorage.getItem('recommended').split(",");
    const [recipeItems, setRecipeItems] = useState([])

    
        console.log(recommended);
        var finalArr = []; 
        var i;
        if(recommended.length <= 1){
            i = 0;
        }else{
            i = 1;
        }
        while (i < recommended.length) {
            finalArr.push(
                <Box>
                    <Center>
                        <Button w="200px">{recommended[i]}</Button>
                    </Center>
                </Box>
            );
            i++;
        }
    
    async function loadReccommend(){
        var result = await Axios.post('http://localhost:5000/findUser', {
            user: localStorage.getItem('username'),  
        });

        var finalArr = []; 
        var i;
        if(result.data.recentlyViewed.length <= 1){
            i = 0;
        }else{
            i = 1;
        }
        while (i < result.data.recentlyViewed.length) {
            finalArr.push(
                <Box>
                    <Center>
                        <Button w="200px">{result.data.recentlyViewed[i]}</Button>
                    </Center>
                </Box>
            );
            i++;
        }
        setRecipeItems(finalArr)
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
                w="60%"
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
                            <FindByPantry/>
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
                            <FormLabel onClick={loadReccommend}>Recommended Recipes</FormLabel>
                            {finalArr}
                        </VStack>
                    </Box>
                </Center>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default SearchRecipes;

