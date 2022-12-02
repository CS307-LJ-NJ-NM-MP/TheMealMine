import { TopNav } from '../topNav'
import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Divider, Textarea } from '@chakra-ui/react'
import { Button, VStack, Text, Box, Container, Input, Image, Center,
        FormLabel, HStack, Modal, ModalOverlay, ModalContent,
        ModalHeader, useDisclosure} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import cookbookBackground from '../imgs/cookingBackground.jpeg'

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
        description: '',
        nameDoc: '',
        imageDoc: '',
        ingredDoc: '',
        instructDoc: '',
        descriptDoc: '',
        categories: '',
        prepTime: '',
        difficulty: '',
        cuisine: '',
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
            description: formValue.description,
            categories: formValue.categories,
            username: username,
            prepTime: formValue.prepTime,
            difficulty: formValue.difficulty,
            cuisine: formValue.cuisine,
            allergens: formValue.allergens


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
            favorites: 0,
            categories: formValue.categories
        });
        window.location.reload(false);

    }
    if(favoriteRecipes[0] !== ''){
        var len = favoriteRecipes.length;
        for(var i = 0; i < len; i+=40){
            let temp = [];
            for(var j = i; j < i+40; j+=8) {
                if(favoriteRecipes[j] === undefined) {break;}
                const element = 
                        <HStack spacing="10px">
                            <Image w="75px" h="75px" borderRadius="full" src={favoriteRecipes[j]}/>
                            <VStack>
                                <Text w="100px">{favoriteRecipes[j+1]}</Text>
                                <Text w="100px">{favoriteRecipes[j+2]}</Text>
                                <Text w="100px">Likes: {favoriteRecipes[j+3]}</Text>
                                <Text w="100px">Description: {favoriteRecipes[j+4]}</Text>
                            </VStack>
                        </HStack>;
                temp.push(element);
            }
            stack1.push(<HStack spacing="100px" width="100%">{temp}</HStack>)
        }
    }

    const handleEdit = (e) => {
		let value = e.target.value;
		let name = e.target.name;
		setEditFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

    const [editFormValue, setEditFormValue] = useState({
        recipeName: '',
        recipeDescription: '',
        recipeIngredients: '',
        recipeInstructions: '',
        
    })

    async function updateRecipe(e) {
        e.preventDefault()

        var index = newContributedRecipesList.indexOf(editFormValue.recipeName)

        if (editFormValue.recipeInstructions !== '') {
            newContributedRecipesList[index + 2] = editFormValue.recipeInstructions
        }
        if (editFormValue.recipeIngredients !== '') {
            newContributedRecipesList[index + 4] = editFormValue.recipeIngredients
        }
        if (editFormValue.recipeDescription !== '') {
            newContributedRecipesList[index + 3] = editFormValue.recipeDescription
        }

        setList(newContributedRecipesList)

        await Axios.post('http://localhost:5000/updateRecipe', {
            name: editFormValue.recipeName,
            instructions: editFormValue.recipeInstructions,
            ingredients: editFormValue.recipeIngredients,
            description: editFormValue.recipeDescription,
            owner: id,
            username: username,
            newList: newContributedRecipesList

        });

        window.location.reload(false);
    }

    const [newContributedRecipesList, setList] = useState([])

    async function findContributedRecipes(e) {
        e.preventDefault()
        var list = await Axios.post('http://localhost:5000/findContributedRecipes', {
            user: username,  
        })
        var newList = list.data
        var len = newList.length;
        var newList = list.data
        var finalList = []
        var len = newList.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < newList[i].length; j++) {
                finalList.push(newList[i][j])
            }
        }
        setList(finalList)
    }

    if(newContributedRecipesList[0] !== []){
        var len = newContributedRecipesList.length;

        for(j = 0; j < len; j += 9) {
            let temp = [];
            if(newContributedRecipesList[j] === undefined){break;}
            temp.push( 
                <Box w="500px" border="1px" borderRadius="lg">
                    <HStack p={1}>
                        <Image m="0 0 0 10px" name={j} w="50px" h="50px" borderRadius="full" src={newContributedRecipesList[j + 4]}/>
                        <VStack spacing="15px" w="90%">
                            <Input 
                            name="recipeName"
                            w="90%" 
                            variant="flushed" 
                            placeholder={"Re-Enter Title: " + newContributedRecipesList[j + 3]}
                            onChange={handleEdit}
                            />
                            <Textarea 
                            name="recipeDescription"
                            w="90%" 
                            variant="flushed" 
                            placeholder={"Description: " + newContributedRecipesList[j + 6]}
                            onChange={handleEdit}
                            />
                            <Input 
                            name="recipeIngredients"
                            w="90%" 
                            variant="flushed" 
                            placeholder={"Ingredients: " + newContributedRecipesList[j + 7]}
                            onChange={handleEdit}
                            />
                            <Input
                            name="recipeInstructions"
                            w="90%"
                            variant="flushed"
                            placeholder={"Instructions: " + newContributedRecipesList[j + 5]}
                            onChange={handleEdit}
                            />
                            <HStack spacing="80px">
                                <Text>Likes: {newContributedRecipesList[j + 1]}</Text>
                                <Text>Categories: {
                                newContributedRecipesList[j + 8]
                                }</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <Center>
                        <Divider w="90%" p="5px" />
                    </Center>
                    <Center>
                        <Button m="5px 5px 5px 5px" w="100%" onClick={updateRecipe}>Edit Contribution</Button> 
                    </Center>
                </Box>
            );
            stack2.push(temp)
        }
    }
    return (
    <body onLoad={findContributedRecipes}>
    <ChakraProvider>
        <Container
        maxW='100%'
        backgroundRepeat="no-repeat"
        bgSize="100%"
        backgroundImage={cookbookBackground}
        align="center"
        >
            <TopNav/>
            <Box
                m="2%"
                bg="white" w='45%'
                p={12}
                borderRadius='lg' borderWidth="1 px"
                alignContent={"center"}
                alignItems="center">
                <Center>
                    <FormLabel>Favorited Recipes</FormLabel>
                </Center>
                <Center>
                <VStack maxH="400px" overflowY="scroll">
                        {stack1}
                    </VStack>
                </Center><br/>
                
                <Center>
                    <Box border="1px" borderRadius="lg">
                        <Center>
                            <FormLabel m="10px 0 0 0">Contributed Recipes</FormLabel>
                        </Center>
                        <Center>
                            <Divider p="5px" w="90%" />
                        </Center>
                        <Center>
                            <VStack m="10px 10px 0 10px" maxH="450px" overflow="hidden" overflowY="scroll"
                                sx={{
                                    '&::-webkit-scrollbar': {
                                    width: '0px',
                                    backgroundColor: `transparent`,
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: `transparent`,
                                    },
                                }}>
                                {stack2}
                            </VStack>
                        </Center>
                        <Center>
                            <Divider w="90%" p="5px" />
                        </Center>
                        <Center>
                            <Button m="10px 5px 5px 5px" w="90%" onClick={onOpen}>Add Contribution</Button>
                        </Center>
                    </Box>
                </Center><br/>
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
                                    <Textarea name="categories" w="100%" variant="flushed" placeholder='Enter Categories' onChange={handleChange}/>
                                    <Textarea name="prepTime" w="100%" variant="flushed" placeholder='Enter Prep Time in Hours' onChange={handleChange}/>
                                    <Textarea name="difficulty" w="100%" variant="flushed" placeholder='Enter Difficulty 1-5' onChange={handleChange}/>
                                    <Textarea name="cuisine" w="100%" variant="flushed" placeholder='Enter Cuisine' onChange={handleChange}/>
                                    <Textarea name="allergens" w="100%" variant="flushed" placeholder='Enter Allergens & Dietary Restrictions' onChange={handleChange}/>
                                    <Button w="100%" borderRadius="lg" onClick={addRecipe}>Add</Button>
                                </VStack>
                            </Center>
                    </ModalContent>
                </Modal>;
                </Box>
        </Container>
    </ChakraProvider>
    </body>
    );
    
}

export default Bookmarks;

/*
        contributedRecipes = [];
        for(var i = 0; i < result2.data.personalRecipes.length; i++){
            let temp = [];
            //img
            temp.push(result2.data.personalRecipes[i][4]);
            //name
            temp.push(result2.data.personalRecipes[i][3]);
            //owner
            temp.push(result2.data.personalRecipes[i][2]);
            //favorites
            temp.push(result2.data.personalRecipes[i][1]);
            //description
            temp.push(result2.data.personalRecipes[i][6]);
            //instructions
            temp.push(result2.data.personalRecipes[i][5]);
            //ingredients
            temp.push(result2.data.personalRecipes[i][7]);
            //id
            temp.push(result2.data.personalRecipes[i][0]);
            //
            temp.push(result2.data.personalRecipes[i][8])
            
            contributedRecipes.push(temp);
        }
        localStorage.setItem('ranking',result2.data.ranking);
        localStorage.setItem('contributedRecipes',contributedRecipes);

*/