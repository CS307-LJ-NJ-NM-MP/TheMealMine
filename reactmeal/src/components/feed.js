import { TopNav } from '../topNav';
import { Box, Button, VStack, Text, Container, 
    Input, Image, Center, Badge, HStack, 
    FormLabel, Divider} from '@chakra-ui/react'
import React, { useState } from "react";
import Axios from "axios";

export const Feed = () => {
    const [formValue, setFormValue] = useState({
		comment: '',
        recipeId: '',
        rating: '',
	});


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

    var name = "Selected Name";
    var owner = "Selected Owner";
    var rating = "Selected Rating";
    var ingred = <Text>Selected Ingredients</Text>;
    var instruct = <Text>Selected Instructions</Text>;
    var descript = <Text>Selected Descriptions</Text>;
    let displayedComments = [<Text>Selected Comments</Text>];

    async function clickRecipe(e) {
        e.preventDefault();
        var buttonId = e.target.id;
        buttonId = parseInt(buttonId);
        name = "Name: " +feed[buttonId+3];
        owner = "Owner: " + feed[buttonId+2];
        rating = "Rating: 0"; 
        descript = feed[buttonId+6];
        ingred = feed[buttonId+7];
        instruct = feed[buttonId+5];
        formValue.recipeId = feed[buttonId];
        var result = await Axios.post('http://localhost:5000/getRatings', {
            recipeId: feed[buttonId]
        });
        rating = "Rating: "+parseInt(result.data.rating);
        var result = await Axios.post('http://localhost:5000/getComments', {
            _id: id,
            recipeId: feed[buttonId]
        });
        let temp = result.data;
        displayedComments = [];
        if(temp[0] !== "No Comments") {
            for(var i = 0; i < result.data.length; i++) {
                var first = ""+temp[i][1];
                var second = " -"+temp[i][0];
                displayedComments.push(first + second);
            }
        }else{
            displayedComments[0] = temp[0];
        }
        document.getElementById("name").innerHTML = name;
        document.getElementById("owner").innerHTML = owner;
        document.getElementById("rating").innerHTML = rating;
        document.getElementById("descriptions").innerHTML = descript;
        document.getElementById("ingredients").innerHTML = ingred;
        document.getElementById("instructions").innerHTML = instruct;
        document.getElementById("comments").innerHTML = displayedComments;
    }

    var id = localStorage.getItem('id');
    var feed = localStorage.getItem('feed').split(",");
    let newFeed = [];
    
    if(feed[0] !== "") { 
        console.log(feed)
        for(var i = 0; i < feed.length; i+=8) {
            let temp = [];
            //if(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(feed[i+4]) !== false){
            //    feed[i+4] = "https://180dc.org/wp-content/uploads/2016/08/default-profile.png";
            //}
            temp.push(
                <Box borderRadius="lg" border="1px" p="10px" w="100%">
                    <HStack>
                        <Box>
                            <HStack>
                            <Box p="10px" align="center">
                                <Image id={i} w="50px" h="50px" borderRadius="full" src={feed[i+4]} onClick={clickRecipe}/>
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
                                    <Button id={i+3} onClick={setRanking}>Rate</Button>
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
    var username = localStorage.getItem('username');
    async function postComment(e) {
        e.preventDefault();
        Axios.post('http://localhost:5000/postComment', {
            user: username,
            recipeId: formValue.recipeId,
            comments: formValue.comment
        });
        document.getElementById("comment").value = "";
    }
    async function setRanking(e) {
        e.preventDefault();
        var buttonId = e.target.id;
        buttonId = parseInt(buttonId);
        var iD = feed[buttonId-3];
        var r = document.getElementById(buttonId-1).value;
        if(r >= 0 && r <= 5) {
            await Axios.post('http://localhost:5000/setRecipeRating', {
                recipeId: iD,
                rating: r
            });
        }
        document.getElementById(buttonId-1).value = "";
    }

    return(<>
        <Container maxW='100%'>
            <TopNav/>
            <Center>
            <Center>
                <Box border="1px" borderRadius="lg">
                <Center>
                    <FormLabel m="10px 0 10px 0">Your Feed</FormLabel>
                </Center>
                <Center>
                <Divider w="90%"/>
                </Center>
                    <HStack spacing="20px">
                    <VStack m="0 0 0 10px" maxH="530px" overflow="hidden" overflowY="scroll" p={2}
                        sx={{
                            '&::-webkit-scrollbar': {
                            width: '0px',
                            backgroundColor: `transparent`,
                            },
                            '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `transparent`,
                            },
                        }}>
                        {newFeed}
                    </VStack>
                        <Box p="10px">
                            <Box p="10px">
                                <FormLabel id="name">Name: {name}</FormLabel>
                                <FormLabel id="owner">Owner: {owner}</FormLabel>
                                <FormLabel id="rating">Rating: {rating}</FormLabel>
                            </Box>
                            <Center>
                                <FormLabel>Description</FormLabel>
                            </Center>
                            <Center>
                                <VStack id="descriptions" spacing="20px" maxW="200px" maxH="100px" overflowY="scroll">
                                    {descript}
                                </VStack>
                            </Center><br/>
                            <Center>
                                <FormLabel>Ingredients</FormLabel>
                            </Center>
                            <Center>
                                <VStack id="ingredients" spacing="20px" maxW="200px" maxH="100px" overflowY="scroll">
                                    {ingred}
                                </VStack>
                            </Center><br/>
                            <Center>
                                <FormLabel>Instructions</FormLabel>
                            </Center>
                            <Center>
                                <VStack id="instructions" spacing="20px" maxW="200px" maxH="100px" overflowY="scroll">
                                    {instruct}
                                </VStack>
                            </Center><br/>
                            <Center>
                                <FormLabel>Comments</FormLabel>
                            </Center>
                            <Center>
                                <VStack id="comments" spacing="20px" maxW="200px" maxH="100px" overflowY="scroll">
                                    {displayedComments}
                                </VStack>
                            </Center>
                            <Box p="10px">
                                <Input id="comment" name="comment" variant="flushed" placeholder='Write Comment' m="0 0 10px 0" onChange={handleChange}/>
                                <Button w="100%" onClick={postComment}>Post</Button>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </Center>
            </Center>
        </Container>
    </>);
}