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
    var username = localStorage.getItem('username');
    const [setDoRender] = useState("no");
    var friendsList = [];
    const [searchUsers, setSearchUsers] = useState([]);

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

    const DisplaySearch = (name) => {
        if ( name === username) {
            return (<div></div>);
        } else {
        return (
        <HStack key={name} width="400px" spacing="10px" border-style="solid">
            <Text width="200px">{name}</Text>
            <Button value={name} align="right" color="blue">Open Info</Button>
        </HStack>
        );
        }
    }

    function DisplayAllSearch() {
        if (localStorage.getItem('isSearching') === "no") {
            return (<div></div>);
        } else if (localStorage.getItem('isSearching') !== "no" && searchUsers.length === 0) {
            return (<div></div>); 
        } else {
        return (
            <Box>
                <ul>
                    {
                        searchUsers.map( (name) => (
                        DisplaySearch(name)
                    ))}
                </ul>
            </Box>
        );
    }}
    async function search(e) {
       e.preventDefault();
        if (e.target.value !== "") {
        await Axios.post('http://localhost:5000/findTheRecReg', {
            search: e.target.value,  
        }).then(response => {
            if (response.data.length !== 0) {
                setSearchUsers(response.data);
            }
            else {
                    setSearchUsers([]);
            }
        });

       friendsList = localStorage.getItem('friendsList').split(",");
       let friendsTemp = [];
        for (var j= 0; j < friendsList.length; j++) {
            if (friendsList[j].includes(e.target.value) === true) {
                friendsTemp.push(friendsList[j]);
            }
        }
        localStorage.setItem('searchingFriends', friendsTemp);
        localStorage.setItem('isSearching', "yes");
    } else {
        localStorage.setItem('isSearching', "no");
    } 
        setDoRender(e.target.value);
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

                <Stack>
                    <VStack>
                        <FindByDifficulty/>
                        <FindByCuisine/>
                        <FindByPrepTime/>
                        <FindByRating/>
                    </VStack>


                    <HStack>
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
                                <Select placeholder='Select Rating'>
                                    <option value='option1'>1</option>
                                    <option value='option2'>2</option>
                                    <option value='option3'>3</option>
                                    <option value='option4'>4</option>
                                    <option value='option5'>5</option>
                                </Select>
                                <Select placeholder='Select Difficulty'>
                                    <option value='option1'>1</option>
                                    <option value='option2'>2</option>
                                    <option value='option3'>3</option>
                                    <option value='option4'>4</option>
                                    <option value='option5'>5</option>
                                </Select>
                                <Select placeholder='Select Cuisine'>
                                    <option value='option1'>Chinese</option>
                                    <option value='option2'>Italian</option>
                                    <option value='option3'>Mexican</option>
                                    <option value='option4'>Indian</option>
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