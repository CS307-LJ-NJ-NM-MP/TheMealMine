import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';
import { ChakraProvider, Button, Image, Center, Heading, 
    HStack, useDisclosure, Modal, ModalOverlay, ModalContent,
    VStack, ModalHeader, Box, FormLabel, Divider } from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,} from '@chakra-ui/react'

export function TopNav() {
    const {isOpen, onOpen, onClose} = useDisclosure();
	var id = localStorage.getItem('id');
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	var image;
	if((username !== '' || username !== "Guest")&&(password !== '' || password !== "Guest")){
		image = localStorage.getItem('image');
	}else{
		image = 'https://cdn1.vectorstock.com/i/1000x1000/66/35/blue-login-icon-vector-3876635.jpg';
	}
	

	function home(e) {
		e.preventDefault();
		window.location = '/home';
	}
	
	async function login(e) {
		e.preventDefault();
		if(username === '' || username === "Guest"){
			window.location = '/';
		}else{
			localStorage.setItem('username',"Guest");
			localStorage.setItem('password',"Guest");
			localStorage.setItem('image','https://www.clipartmax.com/png/middle/15-153139_big-image-login-icon-with-transparent-background.png');
			window.location = '/';
			await Axios.post('http://localhost:5000/logoutUser', {
				user: username,
				pass: password
			});
		}
	}

	function settings(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/settings";
        }
    }
    async function getFriendInfo(friendId){
        console.log(friendId);
        var result = await Axios.post('http://localhost:5000/getFriendRanks', {
            _id: friendId
        });
        return result.data.ranking;
    }
    async function friends(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            var result = await Axios.post('http://localhost:5000/getFriends', {
                _id: id
		    }); 
            let friends = result.data;
            for(var i = 0; i < friends.length; i++){
                result = await Axios.post('http://localhost:5000/getFriendRanks', {
                    _id: friends[i]
                });
                console.log(parseInt(result.data.ranking));
                var rank = result.data.ranking + "";
                let temp = [];
                temp.push(result.data.user);
                temp.push(rank);
                friends[i] = temp;
            }
            localStorage.setItem('friends',friends);
            window.location = "/friends";
        }
    }
    async function bookmarks(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest") {
            var result = await Axios.post('http://localhost:5000/getRecipes', {
                _id: id
		    }); 
            let favoriteRecipes = [];
            for(var i = 0; i < result.data.favoriteRecipes.length; i++){
                let temp = [];
                temp.push(result.data.favoriteRecipes[i][4]);
                temp.push(result.data.favoriteRecipes[i][3]);
                temp.push(result.data.favoriteRecipes[i][2]);
                temp.push(result.data.favoriteRecipes[i][1]);
                temp.push(result.data.favoriteRecipes[i][6]);
                favoriteRecipes.push(temp);
            }
            let contributedRecipes = [];
            console.log(contributedRecipes);
            for(var i = 0; i < result.data.personalRecipes.length; i++){
                let temp = [];
                temp.push(result.data.personalRecipes[i][4]);
                temp.push(result.data.personalRecipes[i][3]);
                temp.push(result.data.personalRecipes[i][2]);
                temp.push(result.data.personalRecipes[i][1]);
                temp.push(result.data.personalRecipes[i][6]);
                contributedRecipes.push(temp);
            }
            console.log(favoriteRecipes);
            console.log(contributedRecipes);
            localStorage.setItem('favoriteRecipes',favoriteRecipes);
            localStorage.setItem('contributedRecipes',contributedRecipes);
            window.location = "/bookmarks";
        }
    }
    async function feed(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            var result = await Axios.post('http://localhost:5000/getFeed', {
                _id: id
		    });
            localStorage.setItem('feed',result.data);
            window.location = "/feed";
        }
    }
	function notis(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/notifications";
        }
    }

    function searchRecipes(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/searchRecipes";
        }
    }

   	return (<ChakraProvider>
        <Center>
            <Box
            bg="white"
            w="37%"
            borderRadius='lg'
            >
                <Center>
            <HStack spacing="20px" h="70px" m="10px 0 10px 0" bg="transparent">
					<Image borderRadius='full' boxSize="50" src={HomeLogo}onClick={home}/>
				
				<Heading color="turquoise" align="center">The Meal Mine</Heading>
				<Menu>
					{({ isOpen }) => (<>
						<MenuButton bg="transparent" isActive={isOpen}>
							<Image borderRadius='full'boxSize="50" src={image}/>
						</MenuButton>
						<MenuList>
                            <MenuItem onClick={bookmarks}>Cookbook</MenuItem>
                            <MenuItem onClick={feed}>Feed</MenuItem>
							<MenuItem onClick={friends}>Friends</MenuItem>
							<MenuItem onClick={notis}>Notifications</MenuItem>
                            <MenuItem onClick={onOpen}>Tutorial</MenuItem>
                            <MenuItem onClick={settings} >Settings</MenuItem>
                            <MenuItem onClick={searchRecipes}>Search Recipes</MenuItem>
							<MenuItem onClick={login}>Login/Logout</MenuItem>
						</MenuList>
					</>)}
				</Menu>
			</HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay/>
				<ModalContent>
                    <Center>
                        <ModalHeader>Tutorial</ModalHeader>
                    </Center>
					<Center>
                        <VStack maxH="500px" overflow="hidden" overflowY="scroll" p={2}
                            sx={{
                                '&::-webkit-scrollbar': {
                                width: '0px',
                                backgroundColor: `transparent`,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                backgroundColor: `transparent`,
                                },
                            }}>
                            <Divider w="90%"/>
                            <FormLabel>Overview</FormLabel>
                            <Box w='90%'>
                                TheMealMine is an app designed to make your life 
                                in the kitchen easier and more efficient. Offered to you
                                are the creations of TheMealMine community, the opportunity
                                to add to the database, and to interact with your friends and family
                                showing off your recipes! Reference below for additional information. 
                            </Box>
                            <FormLabel>Pantry / Home Page</FormLabel>
                            <Box w="90%">
                                The Pantry / Home Page allows you to search for ingredients currently in your   
                                pantry, and add ingredients to the database.
                            </Box>
                            <FormLabel>Cookbook</FormLabel>
                            <Box w="90%">
                                The cookbook displays your favorited recipes and your contributed recipes.
                                From here you can add recipes to display in your friends' feeds. If you want
                                or need to edit a contributed recipe this is also the place to do this.   
                            </Box>
                            <FormLabel>Feed</FormLabel>
                            <Box w="90%">
                                The feed displays all of the most recent contributions made by your friends, as well as
                                recommended recipes by public profiles. By clicking on the username of the author you can 
                                their profile information and a list of their recipes. The same can be said by clicking on 
                                the recipe image, as the information of the currently clicked recipe will be displayed on 
                                screen. You can also try the feed recipes and rate them as well as comment on your experience. 
                                Commenting allows you to talk directly with the author for more information about the recipe.   
                            </Box>
                            <FormLabel>Friends</FormLabel>
                            <Box w="90%">
                                The friends page allows you to search, follow, unfollow, and block users. This page contains a 
                                list of your current friends, a list of profiles you have blocked, and any friend requests you
                                have received.
                            </Box>
                            <FormLabel>Notifications</FormLabel>
                            <Box w="90%">
                                This page displays a log of all interactions you and your content has with other users. After
                                viewing a notification, you can select remove to indicate you have seen the notification.
                            </Box>
                            <FormLabel>Tutorial</FormLabel>
                            <Box w="90%">
                                This is the current pop-up you are reading, and dislay all relevant information about the 
                                functionality of TheMealMine.
                            </Box>
                            <FormLabel>Settings</FormLabel>
                            <Box w="90%">
                                The settings page allows you to explore all of your profile settings and information. All profile
                                information changes, outside of password, can be viewed in the 'Current User Information tab'. If 
                                you would like to change your username, email, password, this can be accomplished under the 'Login
                                Information' tab. You can change your profile picture, privacy status, and cookie settings under the 
                                'Profile Picture', 'Privacy', and 'App' tabs respectively. 
                            </Box>
                            <FormLabel>Login / Logout</FormLabel>
                            <Box w="90%">
                                Logging in and out of your account is simple by selecting your profile picture at the top of any page
                                and then selecting 'Login/Logout'. This will redirect you to the login page.
                            </Box>
                            <FormLabel>Account Status</FormLabel>
                            <Box w="90%">
                                You can either be a MealMine community member or a guest. Guests are welcome, however we encourage you 
                                to sign up for an account as our recipe database can only grow with contributions from our members. Join 
                                TheMealMine today and become the chef you have always wanted to be for free!
                            </Box>
                            <FormLabel>Further Q&A</FormLabel>
                            <Box w="90%">
                                We want to here from you! Your experience is our priority. 
                                For any comments, suggestions, ideas, or inquiries contact 
                                us at themealmine@gmail.com.
                            </Box>
                        </VStack>
					</Center>
                    <Center>
                        <Button m="10px" w="100%" borderRadius="lg" onClick={onClose}>Exit</Button>
                    </Center>
				</ModalContent>
			</Modal>
            </Center>
            </Box>
		</Center>
    </ChakraProvider>)
}