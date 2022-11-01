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
import { useAnimationFrame } from 'framer-motion';

export function Bookmarks() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    var id = localStorage.getItem('id');
    var username = localStorage.getItem('username');
    let favoriteRecipes = localStorage.getItem('favoriteRecipes').split(",");
    let contributedRecipes = localStorage.getItem('contributedRecipes').split(",");
    let stack1 = [];
    let stack2 = [];
    const [formValue, setFormValue] = useState({
		name: '',
        image: '',
        instructions: '',
        ingredients: ''
	})
    const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}
    async function addRecipe(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/addRecipes', {
			_id: id,
            name: formValue.name,
            owner: username,
            image: formValue.image,
            instructions: formValue.instructions,
            ingredients: formValue.ingredients
		});
        Axios.post('http://localhost:5000/addToFeeds', {
            _id: id,
            recipeId: result.data.insertedId,
            owner: username,
            name: formValue.name,
            image: formValue.image,
            instructions: formValue.instructions,
            ingredients: formValue.ingredients,
            favorites: 0
        });
        var result2 = await Axios.post('http://localhost:5000/addRecipeToUser', {
            _id: id,
            recipeId: result.data.insertedId,
            owner: username,
            name: formValue.name,
            image: formValue.image,
            instructions: formValue.instructions,
            ingredients: formValue.ingredients,
            favorites: 0
        });
        contributedRecipes = [];
        for(var i = 0; i < result2.data.personalRecipes.length; i++){
            let temp = [];
            temp.push(result2.data.personalRecipes[i][4]);
            temp.push(result2.data.personalRecipes[i][3]);
            temp.push(result2.data.personalRecipes[i][2]);
            temp.push(result2.data.personalRecipes[i][1]);
            contributedRecipes.push(temp);
        }
        localStorage.setItem('contributedRecipes',contributedRecipes);
        window.location.reload(false);
    }
    if(favoriteRecipes[0] !== '') {
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
    }
    if(contributedRecipes[0] !== ''){
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
    }
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
                                    <Input name="name" w="100%" variant="flushed" placeholder='Enter Title' onChange={handleChange}/>
                                    <Input name="image" w="100%" variant="flushed" placeholder='Enter Image' onChange={handleChange}/>
                                    <Textarea name="instructions" w="100%" variant="flushed" placeholder='Enter Instructions' onChange={handleChange}/>
                                    <Textarea name="ingredients" w="100%" variant="flushed" placeholder='Enter Ingredients' onChange={handleChange}/>
                                    <Button w="100%" borderRadius="lg" onClick={addRecipe}>Add</Button>
                                </VStack>
                            </Center>
                        </ModalContent>
                    </Modal>
        </Container>
    </ChakraProvider>);
}

export default Bookmarks;