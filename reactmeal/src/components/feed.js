import { TopNav } from '../topNav';
import { Box, Button, VStack, Text, Container, 
    Input, Image, Center, Badge, HStack, 
    FormLabel, Divider} from '@chakra-ui/react'
import React, { useState } from "react";
import Axios from "axios";
import feedBackground from '../imgs/feedBackground.jpeg'

export const Feed = () => {
    const [formValue, setFormValue] = useState({
		comment: '',
        recipeId: '',
        rating: '',
	});
    var noNoWords = ["iu", "ass", "bitch", "stupid"];

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
        //I think the call below is causing an error.
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

    const [feed, setFeed] = useState([])
    async function getFromFeed(e) {
        e.preventDefault()
        console.log("username " + username)
        var list = await Axios.post('http://localhost:5000/getFromFeed', {
            user: username  
        })
        console.log("here is feed")
        console.log(list)
        var newList = list.data
        var len = newList.length;
        var finalList = []
        var len = newList.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < newList[i].length; j++) {
                finalList.push(newList[i][j])
            }
        }
        setFeed(finalList)
    }
    let newFeed = [];

    async function likeRecipe(e) {
        e.preventDefault();
        var value = parseInt(e.target.id) - 4;
        console.log(feed[value])
        var tempId = feed[value]
        var result = await Axios.post('http://localhost:5000/addToFavorites', {
            userId: id,
            recipeId: feed[value]
        });
        console.log("like number: " + result.data.likes)
        var likeNumber = result.data.likes
        var tempFeed = feed
        var index = tempFeed.indexOf(tempId)
        tempFeed[index + 1] = likeNumber
        console.log("new likes" + tempFeed[index + 1])


        result = await Axios.post('http://localhost:5000/updateFeed', {
            userId: id,
            newList: tempFeed
        });
        setFeed(tempFeed)
        console.log(feed)
        window.location.reload(false)
        
    }

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
                                <Button id={i+4} onClick={likeRecipe} border="1px" bg="transparent" w="100%">Favorite</Button>
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
        /* Maddie's code for content moderation below*/
        //console.log(formValue.comment);
        var cmt = formValue.comment.toLowerCase();
       // console.log("Lowercase: " + cmt);
        var appropriate = noNoWords.every(word => {
            //True means there is no bad word ; False means there is a bad word
            //If the comment does not contain word
            if (!cmt.includes(word)) { return true; }
            //If the comment starts with word
            if (cmt.startsWith(word + " ")) { 
               // console.log("Oopsies, the word: " + word + " is icky!");
                return false; 
            }
            if (cmt.endsWith(" " + word)) {
                //console.log("Oopsies, it ends with a bad word: " + word);
                return false;
            }
            if (cmt.includes(" " + word + " ")) {
                //console.log("Hey Potty Mouth! " + word + " is a bad word! Fuckhead.");
                return false;
            }
            //There can be cases made for punctuation not included as well.
            return true;
        });
       // console.log("isAppropriate: " + appropriate);
        if (!appropriate) {
            alert("Hey! You can't post that because it's a bad word!");
        } else {
        Axios.post('http://localhost:5000/postComment', {
            user: username,
            recipeId: formValue.recipeId,
            comments: formValue.comment
        });
        document.getElementById("comment").value = "";
        }
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

    return(
    <body onLoad={getFromFeed}>
        <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={feedBackground} align="center">
            <TopNav/>
            <Center>
            <Center>
                <Box borderRadius="lg" m="2%" bg="white" padding="10px">
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
        </body>
    );
}