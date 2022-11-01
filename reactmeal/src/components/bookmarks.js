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
    let favoriteRecipes = [
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3]
    ];
    let contributedRecipes = [
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3],
        [recipesBackground,"Mac n Cheese","Nate",3]
    ];
    let stack1 = [];
    let stack2 = [];
    for(var i = 0; i < favoriteRecipes.length/5; i++){
        let temp = [];
        for(var j = 0; j < 5; j++) {
            var recipe = favoriteRecipes[j];
            let element = 
                    <HStack spacing="10px">
                        <Image w="75px" h="75px" borderRadius="full" src={recipe[0]}/>
                        <VStack>
                            <Text w="100px">{recipe[1]}</Text>
                            <Text w="100px">{recipe[2]}</Text>
                            <Text w="100px">Likes: {recipe[3]}</Text>
                        </VStack>
                    </HStack>;
            temp.push(element);
        }
        stack1.push(<HStack spacing="100px" width="100%">{temp}</HStack>)
    }
    for(var i = 0; i < contributedRecipes.length/5; i++){
        let temp = [];
        for(var j = 0; j < 5; j++) {
            var recipe = contributedRecipes[j];
            let element = 
                    <HStack spacing="10px">
                        <Image w="75px" h="75px" borderRadius="full" src={recipe[0]}/>
                        <VStack>
                            <Text w="100px">{recipe[1]}</Text>
                            <Text w="100px">{recipe[2]}</Text>
                            <Text w="100px">Likes: {recipe[3]}</Text>
                        </VStack>
                    </HStack>;
            temp.push(element);
        }
        stack2.push(<HStack spacing="100px" width="100%">{temp}</HStack>)
    }
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (<ChakraProvider>
        <Container>
            <TopNav/>
                <Center>
                    <VStack>
                        <FormLabel>Favorite Recipes</FormLabel>
                        {stack1}
                    </VStack>
                </Center><br/>
                <Center>
                    <VStack>
                        <FormLabel>Contributed Recipes</FormLabel>
                        {stack2}
                    </VStack>
                </Center><br/>
                <Center>
                    <Button onClick={onOpen}>Add Contribution</Button>
                </Center>
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
        </Container>
    </ChakraProvider>);
}

export default Bookmarks;