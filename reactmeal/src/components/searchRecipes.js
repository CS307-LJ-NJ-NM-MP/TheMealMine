import React from "react";
import { Box, Center, Container, FormLabel, VStack,
    Button, Divider} from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { FindByDifficulty } from '../findRecipesByDifficulty';
import { FindByCuisine } from '../findRecipesByCuisine';
import { FindByPrepTime } from "../findRecipesByPrep";
import searchBackground from '../imgs/searchBackground.jpg'
import { FindByRating } from '../findRecipesByRating'
import { FindByAllergens } from '../findRecipesByAllergens'
function SearchRecipes() {    
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
                            <Button  w="200px">Recipe 1</Button>
                        </VStack>
                    </Box>
                </Center>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default SearchRecipes;

