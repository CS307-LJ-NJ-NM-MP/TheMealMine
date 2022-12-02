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
import { FindByAllergens } from '../findRecipesByAllergens'
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
                        <FindByAllergens/>
                    </VStack>
                    
                </VStack>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default SearchRecipes;

