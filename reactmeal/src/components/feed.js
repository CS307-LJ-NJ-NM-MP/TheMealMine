import { TopNav } from '../topNav';

import { SideNav } from '../sideNav';
import { CategoryNav } from '../categoryNav';
import { Comments } from '../comments';
import { FeedNav } from '../feedNav';
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
<<<<<<< HEAD
    Badge, HStack, FormLabel} from '@chakra-ui/react'
=======
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'

>>>>>>> 821391ac4ecfb00220f7aa15750cf2b60f007bae
import React, { useState } from "react";
import Axios from "axios";

export const Feed = () => {
<<<<<<< HEAD
    var id = localStorage.getItem('id');
    var feed = localStorage.getItem('feed').split(",");
    let newFeed = [];
    if(feed[0] !== "") { 
        for(var i = 0; i < feed.length; i+=8) {
            let temp = [];
            if(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(feed[i+4]) !== true){
                feed[i+4] = "https://180dc.org/wp-content/uploads/2016/08/default-profile.png";
            }
            temp.push(
                <Box borderRadius="lg" border="1px" p="10px" w="100%">
                    <HStack>
                        <Box>
                            <HStack>
                            <Box p="10px" align="center">
                                <Image id={i} w="50px" h="50px" borderRadius="full" src={feed[i+4]}/>
                            </Box>
                            <Box w="100px" p="10px">
                                <Text>{feed[i+3]}</Text>
                                <Text>{feed[i+2]}</Text>
                                <Text id={i+1}>Likes: {feed[i+1]}</Text>
                            </Box>
                            </HStack>
                            <Box p="10px">
                                <Center>
                                    <Badge borderRadius="lg" w="200px" align="center">Category</Badge>
                                </Center>
                            </Box>
                        </Box>
                        <Box p="10px">
                            <VStack spacing="15px">
                                <Center>
                                    <Input id={i+2} variant="flushed" placeholder='Rating / 5'/>
                                    <Button id={i+3}>Rate</Button>
                                </Center>
                                <Button id={i+4} border="1px" bg="transparent" w="100%">Favorite</Button>
                            </VStack>
                        </Box>
                    </HStack>
                </Box> 
            );
            newFeed.push(temp);
        }

    }else{
        newFeed = [<Text>No Recipes to Display</Text>];
    }
    return(<>
        <Container maxW='100%'>
            <TopNav/>
            <Center>
                <FormLabel>Your Feed</FormLabel>
            </Center>
            <Center>
            <Center>
                <HStack spacing="20px">
                    <VStack spacing="20px" maxW="100%">
                            {newFeed}
                    </VStack>
                    <Box borderRadius="lg" border="1px">
                        <FormLabel>Name: Name of Recipe</FormLabel>
                        <FormLabel>Owner: Username</FormLabel>
                        <FormLabel>Rating: Current Rating</FormLabel>
                        <FormLabel></FormLabel>
                        <Text>Fun Box Here</Text>
                    </Box>
                </HStack>
                
            </Center>
            </Center>
        </Container>
    </>);
=======
    return (
        <>
            <TopNav/>

            <FeedNav/>
            
            <SideNav/>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <br />

            <br />
            <CategoryNav/>
            </div>
            <Comments/>
            
        </>
    );

>>>>>>> 821391ac4ecfb00220f7aa15750cf2b60f007bae
}