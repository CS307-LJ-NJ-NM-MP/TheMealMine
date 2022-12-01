import { TopNav } from '../topNav'
import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Divider, list, Textarea } from '@chakra-ui/react'
import { Button, VStack, Text, Box, Container, Input, Image, Center,
        FormLabel, HStack, Modal, ModalOverlay, ModalContent,
        ModalHeader, useDisclosure} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';

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
            cuisine: formValue.cuisine

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
            /* img */
            temp.push(result2.data.personalRecipes[i][4]);
            /* name */
            temp.push(result2.data.personalRecipes[i][3]);
            /* owner */
            temp.push(result2.data.personalRecipes[i][2]);
            /* favorites */
            temp.push(result2.data.personalRecipes[i][1]);
            /* description */
            temp.push(result2.data.personalRecipes[i][6]);
            /* instructions */
            temp.push(result2.data.personalRecipes[i][5]);
            /* ingredients */
            temp.push(result2.data.personalRecipes[i][7]);
            /* id */
            temp.push(result2.data.personalRecipes[i][0]);
            contributedRecipes.push(temp);
        }
        localStorage.setItem('ranking',result2.data.ranking);
        localStorage.setItem('contributedRecipes',contributedRecipes);
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
    var recipeId = "RecipeId";
    var name = "Selected Name";
    var image = "Selected Image";
    var ingred = "Selected Ingredients";
    var instruct = "Selected Instructions";
    var descript = "Selected Descriptions";
    async function clickRecipe(e) {
        e.preventDefault();
        var buttonId = e.target.name;
        buttonId = parseInt(buttonId);
        recipeId = contributedRecipes[buttonId+7]

        name = contributedRecipes[buttonId+1];
        image = contributedRecipes[buttonId];
        descript = contributedRecipes[buttonId+4];
        ingred = contributedRecipes[buttonId+6];
        instruct = contributedRecipes[buttonId+5];
        var nDoc = document.getElementById("name");
        nDoc.value = ""; nDoc.setAttribute('placeholder',name);
        nDoc = document.getElementById("image");
        nDoc.value = ""; nDoc.setAttribute('placeholder',image);
        nDoc = document.getElementById("ingredients");
        nDoc.value = ""; nDoc.setAttribute('placeholder',ingred);
        nDoc = document.getElementById("instructions");
        nDoc.value = ""; nDoc.setAttribute('placeholder',instruct);
        nDoc = document.getElementById("description");
        nDoc.value = ""; nDoc.setAttribute('placeholder',descript);
    }
    var titleId = 0
    var descId = 0


    const handleEdit = (e) => {
		let value = e.target.value;
        console.log("new text: " + value)
		let name = e.target.name;
        console.log("the thing " + name)
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

        console.log("name "+ editFormValue.recipeName)
        console.log("instructions " + editFormValue.recipeInstructions)
        console.log("ingredients " + editFormValue.recipeIngredients)
        console.log("description " + editFormValue.recipeDescription)

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


        var result = await Axios.post('http://localhost:5000/updateRecipe', {

            name: editFormValue.recipeName,
            instructions: editFormValue.recipeInstructions,
            ingredients: editFormValue.recipeIngredients,
            description: editFormValue.recipeDescription,
            owner: id,
            username: username,
            newList: newContributedRecipesList

        });

        console.log(result.data.personalRecipes)

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

        console.log(finalList)
        setList(finalList)

    }



    if(newContributedRecipesList[0] !== []){

        var len = newContributedRecipesList.length;

        for(j = 0; j < len; j += 8) {
            let temp = [];
            if(newContributedRecipesList[j] === undefined){break;}
            if(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(newContributedRecipesList[j + 4]) !== true){
                newContributedRecipesList[j + 4] = "https://180dc.org/wp-content/uploads/2016/08/default-profile.png";
            }

            temp.push( 
                <Box w="500px" border="1px" borderRadius="lg">
                    <HStack p={1}>
                        <Image m="0 0 0 10px" name={j} w="50px" h="50px" borderRadius="full" src={newContributedRecipesList[j + 4]} onClick={clickRecipe}/>
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
                                <Text>Categories: </Text>
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
        <Container maxW='100%'>
            <TopNav/>
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
                                    <Button w="100%" borderRadius="lg" onClick={addRecipe}>Add</Button>
                                </VStack>
                            </Center>
                    </ModalContent>
                </Modal>;
        </Container>
    </ChakraProvider>
    </body>
    );
    
}

export default Bookmarks;