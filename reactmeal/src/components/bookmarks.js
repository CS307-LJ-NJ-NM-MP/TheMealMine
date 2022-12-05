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
//    let favoriteRecipes = localStorage.getItem('favoriteRecipes').split(",");


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

    const [favoriteRecipes, setFavoriteRecipes] = useState([])

    async function findFavoriteRecipes(e) {
        e.preventDefault()
        //Find the favorite recipes list
        console.log("user id")
        console.log(id)
        var result = await Axios.post('http://localhost:5000/findFavoriteRecipes', {
            userId: id
        })
        console.log(result.data)

        var recipeArray = []

        for (var i = 0; i < result.data.length; i++) {
            //find the recipe
            var recipe = await Axios.post('http://localhost:5000/findRecipeById', {
                recipeId: result.data[i]
            })

            console.log("recipe name")
            console.log(recipe.data.name)

            //find the recipe owner
            var recipeOwner = await Axios.post('http://localhost:5000/findUserById', {
                userId: recipe.data.owner
            })

            //add favorite recipes
            recipeArray.push(recipe.data.name)
            recipeArray.push(recipeOwner.data)
            recipeArray.push(recipe.data.description)
            recipeArray.push(recipe.data.likes)
            recipeArray.push(recipe.data.image)
            recipeArray.push(recipe.data.ingredients.join())
            recipeArray.push(recipe.data.instructions)
            if (recipe.data.prepTime > 1) {
               var string = "" + recipe.data.prepTime + " hrs"
               recipeArray.push(string)
            }
            else if (recipe.data.prepTime == 1) {
                var string = "" + recipe.data.prepTime + " hr"
                recipeArray.push(string)
            }
            else {
                var timeInMins = recipe.data.prepTime * 60
                var string = "" + timeInMins + " mins"
                recipeArray.push(string)
            }

        }
        setFavoriteRecipes(recipeArray)
        console.log(favoriteRecipes)
    }


    if(favoriteRecipes[0] !== ''){
        var len = favoriteRecipes.length;

        for(var j = 0; j < len; j+=8){
            let temp = [];
            if(favoriteRecipes[j] === undefined) 
            {
                break;
            }
            temp.push( 
                <Box w="500px" border="1px" borderRadius="lg">
                    <HStack p={1}>
                        <Image m="0 0 0 10px" name={j} w="50px" h="50px" borderRadius="full" src={favoriteRecipes[j + 4]}/>
                        <VStack spacing="15px" w="90%">
                            <FormLabel w="300px" >Text<Divider w="90%"/>
                                {favoriteRecipes[j]}</FormLabel>
                            <FormLabel w="300px" >Chef<Divider w="90%"/>
                                {favoriteRecipes[j+1]}</FormLabel>
                            <FormLabel w="300px" >Description<Divider w="90%"/>
                                {favoriteRecipes[j+2]}</FormLabel>
                            <FormLabel w="300px" >Ingredients<Divider w="90%"/>
                                {favoriteRecipes[j+5]}</FormLabel>
                            <FormLabel w="300px" >Instructions<Divider w="90%"/>
                                {favoriteRecipes[j+6]}</FormLabel>
                            <FormLabel w="300px">Likes<Divider w="90%"/>
                                {favoriteRecipes[j+3]}</FormLabel>
                            <FormLabel w="300px">Prep Time<Divider w="90%"/> 
                                {favoriteRecipes[j+7]}</FormLabel>
                        </VStack>
                    </HStack>
                    <Center>
                        <Divider w="90%" p="5px" />
                    </Center>
                </Box>
            );
            stack1.push(temp)
        }



    }

    const handleEdit = (e) => {
        console.log(editFormValue)
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


        
        var result = await Axios.post('http://localhost:5000/updateRecipe', {
            name: editFormValue.recipeName,
            instructions: editFormValue.recipeInstructions,
            ingredients: editFormValue.recipeIngredients,
            description: editFormValue.recipeDescription,
            owner: id,
            username: username,
            newList: newContributedRecipesList,
            _id: id

        });


        console.log(result.data)



        window.location.reload(false);
    }

    const [newContributedRecipesList, setList] = useState([])

    async function findAllRecipes(e) {
        findFavoriteRecipes(e)
        findContributedRecipes(e)
    }

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
                            <Center>
                                <Text>Categories: {
                                newContributedRecipesList[j + 8]
                                }</Text>
                            </Center>
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
    <body onLoad={findAllRecipes}>
    <ChakraProvider>
    <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={cookbookBackground} align="center">
        
            <TopNav/>
            <Box m="2%"
                bg="white" w='80%'
                p={5}
                borderRadius='lg' borderWidth="1 px"
                alignContent={"center"}
                alignItems="center">
                <Center>
                    <Box border="1px" borderRadius="lg">
                        <VStack padding="10px" w="100%">
                            <Center>
                            <Box w="525px">Favorited Recipes</Box>
                            <Box w="525px">Contributed Recipes</Box>
                            </Center>
                            <Divider/>
                        </VStack>
                        <Center>
                            <VStack m="10px 10px 0 10px" maxH="550px" overflow="hidden" overflowY="scroll"
                                sx={{
                                    '&::-webkit-scrollbar': {
                                    width: '0px',
                                    backgroundColor: `transparent`,
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: `transparent`,
                                    },
                                }}>
                                {stack1}
                            </VStack>
                            <VStack m="10px 10px 0 10px" maxH="550px" overflow="hidden" overflowY="scroll"
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
