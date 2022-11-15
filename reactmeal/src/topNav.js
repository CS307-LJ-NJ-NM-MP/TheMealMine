import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';
import { ChakraProvider, Button, Image, Center, Heading, HStack } from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,} from '@chakra-ui/react'

export function TopNav() {
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
    function friends(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
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
            <HStack spacing="20px" h="70px" m="10px 0 10px 0" bg="transparent">
					<Image borderRadius='full' boxSize="50" src={HomeLogo}onClick={home}/>
				
				<Heading color="turquoise" align="center">The Meal Mine</Heading>
				<Menu>
					{({ isOpen }) => (<>
						<MenuButton bg="transparent" isActive={isOpen}>
							<Image borderRadius='full'boxSize="50" src={image}/>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={settings} >Settings</MenuItem>
							<MenuItem onClick={friends}>Friends</MenuItem>
							<MenuItem onClick={bookmarks}>Bookmarks</MenuItem>
							<MenuItem onClick={feed}>Feed</MenuItem>
							<MenuItem onClick={notis}>Notifications</MenuItem>
                            <MenuItem onClick={searchRecipes}>Search Recipes</MenuItem>
							<MenuItem onClick={login}>Login/Logout</MenuItem>
						</MenuList>
					</>)}
				</Menu>
			</HStack>
		</Center>
    </ChakraProvider>)
}