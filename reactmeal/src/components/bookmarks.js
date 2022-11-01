import { TopNav } from '../topNav'
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import Axios from "axios";
import { list, Textarea } from '@chakra-ui/react'
import recipesBackground from "../imgs/recipesBackground.jpg"
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
        TabPanel, FormLabel, HStack, Modal, ModalOverlay, ModalContent,
        ModalHeader, ModalCloseButton, useDisclosure, ModalBody, ModalFooter} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

export function Bookmarks() {
    var id = localStorage.getItem('id');
    let favoriteRecipes = localStorage.getItem('favoriteRecipes').split(",");
    let contributedRecipes = localStorage.getItem('contributedRecipes').split(",");
    let stack1 = [];
    let stack2 = [];
    for(var i = 0; i < favoriteRecipes.length/5/5; i++){
        let temp = [];
        for(var j = 0; j < favoriteRecipes.length; j+=4) {
            let element = 
                    <HStack spacing="10px">
                        <Image w="75px" h="75px" borderRadius="full" src={favoriteRecipes[j]}/>
                        <VStack>
                            <Text w="100px">{favoriteRecipes[j+1]}</Text>
                            <Text w="100px">{favoriteRecipes[j+2]}</Text>
                            <Text w="100px">Likes: {favoriteRecipes[j+3]}</Text>
                        </VStack>
                    </HStack>;
            temp.push(element);
        }
        stack1.push(<HStack spacing="100px" width="100%">{temp}</HStack>)
    }
    for(var i = 0; i < contributedRecipes.length/5/5; i++){
        let temp = [];
        for(var j = 0; j < contributedRecipes.length; j+=4) {
            let element = 
                    <HStack spacing="10px">
                        <Image w="75px" h="75px" borderRadius="full" src={contributedRecipes[j]}/>
                        <VStack>
                            <Text w="100px">{contributedRecipes[j+1]}</Text>
                            <Text w="100px">{contributedRecipes[j+2]}</Text>
                            <Text w="100px">Likes: {contributedRecipes[j+3]}</Text>
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