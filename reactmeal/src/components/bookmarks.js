import { TopNav } from '../topNav'
import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Textarea } from '@chakra-ui/react'
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, VStack, Text, Container, Input, Image, Center,
        FormLabel, HStack, Modal, ModalOverlay, ModalContent,
        ModalHeader, useDisclosure} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

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
        ingredients: '',
        description: ''
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
            ingredients: formValue.ingredients,
            description: formValue.description
		});
        Axios.post('http://localhost:5000/addToFeeds', {
            _id: id,
            recipeId: result.data.insertedId,
            owner: username,
            name: formValue.name,
            image: formValue.image,
            instructions: formValue.instructions,
            ingredients: formValue.ingredients,
            description: formValue.description,
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
            description: formValue.description,
            favorites: 0
        });
        console.log(result2.data.personalRecipes);
        contributedRecipes = [];
        for(var i = 0; i < result2.data.personalRecipes.length; i++){
            let temp = [];
            temp.push(result2.data.personalRecipes[i][4]);
            temp.push(result2.data.personalRecipes[i][3]);
            temp.push(result2.data.personalRecipes[i][2]);
            temp.push(result2.data.personalRecipes[i][1]);
            temp.push(result2.data.personalRecipes[i][6]);
            temp.push(result2.data.personalRecipes[i][5]);
            temp.push(result2.data.personalRecipes[i][7]);
            temp.push(result2.data.personalRecipes[i][0]);
            contributedRecipes.push(temp);
        }
        localStorage.setItem('ranking',result2.data.ranking);
        localStorage.setItem('contributedRecipes',contributedRecipes);
        window.location.reload(false);
    }
    if(favoriteRecipes[0] !== '') {
        for(var i = 0; i < favoriteRecipes.length/5/5; i++){
            let temp = [];
            for(var j = 0; j < favoriteRecipes.length; j+=5) {
                const element = () => {
                        <HStack spacing="10px">
                            <Button onClick={console.log("John")}><Image w="75px" h="75px" borderRadius="full" src={favoriteRecipes[j]}/></Button>
                            <VStack>
                                <Text w="100px">{favoriteRecipes[j+1]}</Text>
                                <Text w="100px">{favoriteRecipes[j+2]}</Text>
                                <Text w="100px">Likes: {favoriteRecipes[j+3]}</Text>
                                <Text w="100px">Description: {favoriteRecipes[j+4]}</Text>
                            </VStack>
                        </HStack>;
                }
                temp.push(element);
            }
            stack1.push(<HStack spacing="100px" width="100%">{temp}</HStack>)
        }
    }
    async function gotit(e) {
        e.preventDefault();
        var buttonId = e.target.name;
        var recipeId = contributedRecipes[buttonId+7]
        var name = contributedRecipes[buttonId+1];
        var image = contributedRecipes[buttonId];
        var descript = contributedRecipes[buttonId+4];
        var ingred = contributedRecipes[buttonId+6];
        var instruct = contributedRecipes[buttonId+5];

    }
    if(contributedRecipes[0] !== ''){
        var len = contributedRecipes.length;
        for(i = 0; i < len; i+=40){
            let temp = [];
            for(j = i; j < i+40; j+=8) {
                if(contributedRecipes[j] === undefined){break;}
                const element = 
                        <HStack spacing="10px">
                            <Image name={j} w="75px" h="75px" borderRadius="full" src={contributedRecipes[j]} onClick={gotit}/>
                            <VStack>
                                <Text w="100px">{contributedRecipes[j+1]}</Text>
                                <Text w="100px">{contributedRecipes[j+2]}</Text>
                                <Text w="100px">Likes: {contributedRecipes[j+3]}</Text>
                                <Text w="100px">Description: {contributedRecipes[j+4]}</Text>
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
                        <FormLabel id="hi">Favorite Recipes</FormLabel>
                        {stack1}
                    </VStack>
                </Center><br/>
                <Center>
                    <VStack>
                        <FormLabel>Contributed Recipes</FormLabel>
                        <HStack>
                            <Textarea name="name" placeholder='Selected Name' variant="flushed"/>
                            <Textarea name="image" placeholder='Selected Image' variant="flushed"/>
                            <Textarea name="ingredients" placeholder='Selected Ingredients' variant="flushed"/>
                            <Textarea name="instructions" placeholder='Selected Instructions' variant="flushed"/>
                            <Textarea name="description" placeholder='Selected Descriptions' variant="flushed"/>
                        </HStack>
                        {stack2}
                    </VStack>
                </Center><br/>
                <Center>
                    <HStack>   
                        <Button onClick={onOpen}>Add Contribution</Button>
                        <Button>Edit Contribution</Button>
                    </HStack>
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
                                        <Textarea name="description" w="100%" variant="flushed" placeholder='Enter Description' onChange={handleChange}/>
                                        <Button w="100%" borderRadius="lg" onClick={addRecipe}>Add</Button>
                                    </VStack>
                                </Center>
                        </ModalContent>
                    </Modal>;
        </Container>
    </ChakraProvider>);
}

export default Bookmarks;