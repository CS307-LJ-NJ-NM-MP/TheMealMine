import { TopNav } from '../topNav'
import ReactDOM from 'react-dom';
import { useState } from "react";
import Axios from "axios";
import { list, Textarea } from '@chakra-ui/react'
import recipesBackground from "../imgs/recipesBackground.jpg"
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
        TabPanel, FormLabel, HStack, Modal, ModalOverlay, ModalContent,
        ModalHeader, ModalCloseButton, useDisclosure, ModalBody, ModalFooter} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

export function Bookmarks() {
    //const root = ReactDOM.createRoot(document.getElementById('root'));
    let favoriteRecipes = [
        <Text>Recipe 1</Text>,
        <Text>Recipe 2</Text>,
        <Text>Recipe 3</Text>,
        <Text>Recipe 4</Text>,
        <Text>Recipe 5</Text>
    ];
    let stack1 = [];
    for(var i = 0; i < favoriteRecipes.length/5; i++){
        let temp = [];
        for(var j = 0; j < 5; j++) {
            temp.push(favoriteRecipes[j]);
        }
        stack1.push(<HStack>{temp}</HStack>)
    }
    /*<Box bg="blackAlpha.300" borderRadius="lg" 
                                onClick={onOpen}>
                                <HStack m="5px 10px 5px 10px">
                                    <Image borderRadius='lg' width='75px' src={recipesBackground}/>
                                    <VStack>
                                        <Text>Mac n Cheese</Text>
                                        <Text>Nate</Text>
                                        <Text>Likes: 3</Text>
                                    </VStack>
                                </HStack>
                            </Box>*/
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (<ChakraProvider>
        <Container>
            <TopNav/>
            <Center>
                <VStack m="10px 0 10px 0">
                    <VStack>
                        <FormLabel>Favorite Recipes</FormLabel>
                        {stack1}
                    </VStack><br/>
                    <VStack>
                        <FormLabel>Contributed Recipes</FormLabel>
                        {stack1}
                    </VStack><br/>
                    <Button onClick={onOpen}>Add Contribution</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <Center>
                                <VStack spacing='5%' m="0 0 20px 0">
                                    <ModalHeader>Enter New Recipe Information</ModalHeader>
                                    <Input w="100%" variant="flushed" placeholder='Enter Title'/>
                                    <Input w="100%" variant="flushed" placeholder='Enter Image'/>
                                    <Textarea w="100%" variant="flushed" placeholder='Enter Instructions'/>
                                    <Textarea w="100%" variant="flushed" placeholder='Enter Ingredients'/>
                                    <Textarea w="100%" variant="flushed" placeholder='Enter Special Tools'/>
                                    <Button w="100%" borderRadius="lg" onClick={onClose}>Add</Button>
                                </VStack>
                            </Center>
                        </ModalContent>
                    </Modal>
                </VStack>
            </Center>
        </Container>
    </ChakraProvider>);
}

export default Bookmarks;