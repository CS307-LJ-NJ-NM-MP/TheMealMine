import React from "react";
import { Box, Center, Container, Text, Input, Button, HStack, VStack } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";
import Axios from "axios";
import { FindByDifficulty } from '../findRecipesByDifficulty';
import { FindByCuisine } from '../findRecipesByCuisine';
import { FindByPrepTime } from "../findRecipesByPrep";
import { Select } from '@chakra-ui/react'
import searchBackground from '../imgs/searchBackground.jpg'
import { FindByRating } from '../findRecipesByRating'
function SearchRecipes() {
    var friendsList = [];

    var iS = localStorage.getItem('isSearching');

    if (iS === "no") {
			var userFriendsList = localStorage.getItem('friendsList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",");
			} else {
				friendsList = [];
			}
    } else {
        friendsList = localStorage.getItem('searchingFriends').split(",");
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
            m="2%"
            bg="white" w='69%'
            p={4}
            borderRadius='lg' borderWidth="1 px"
            alignContent={"center"}
            alignItems="center">

                <VStack>
                    <VStack>
                        <FindByDifficulty/>
                        <FindByCuisine/>
                        <FindByPrepTime/>
                        <FindByRating/>
                    </VStack>

                    <Box>
                        <VStack>
                            <Select placeholder='Select Allergy/Dietary restriction'>
                                <option value='option1'>Vegan</option>
                                <option value='option2'>Vegetarian</option>
                                <option value='option3'>No Wheat</option>
                            </Select>
                            <Select placeholder='Select Rating'>
                                <option value='option1'>1</option>
                                <option value='option2'>2</option>
                                <option value='option3'>3</option>
                                <option value='option4'>4</option>
                                <option value='option5'>5</option>
                            </Select>

                        </VStack>
                    </Box>
                    <FindByDifficulty/>
                    <FindByCuisine/>
                    <FindByPrepTime/>
                    <Box w="100%" padding="5px">
                            <VStack w="50%">
                                <Select placeholder='Select Allergy/Dietary restriction'>
                                    <option value='option1'>Vegan</option>
                                    <option value='option2'>Vegetarian</option>
                                    <option value='option3'>No Wheat</option>
                                </Select>
                            </VStack>
                    </Box>
                    
                </VStack>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default SearchRecipes;

