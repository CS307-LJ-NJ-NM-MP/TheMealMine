import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';
import { ChakraProvider, Button, Image, Center, Heading, HStack } from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,} from '@chakra-ui/react'

export function TopNav() {
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
            window.location = "/bookmarks";
        }
    }
    function feed(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/feed";
        }
    }
	function notis(e) {
        e.preventDefault();
        if(username !== "Guest" && password !== "Guest"){
            window.location = "/notifications";
        }
    }


   	return (<ChakraProvider>
		<Center>
            <HStack spacing="20px" h="70px" m="10px 0 10px 0" bg="transparent">
					<Image borderRadius='full' boxSize="50" src={HomeLogo}onClick={home}/>
				
				<Heading color="turquoise" align="center">The Meal Mine</Heading>
					<Image borderRadius='full'boxSize="50" src={image} onClick={login}/>
				<Menu>
					{({ isOpen }) => (
						<>
						<MenuButton isActive={isOpen} as={Button} >
							{isOpen ? 'Close' : 'Open'}
						</MenuButton>
						<MenuList>
							<MenuItem onClick={settings} >Settings</MenuItem>
							<MenuItem onClick={friends}>Friends</MenuItem>
							<MenuItem onClick={bookmarks}>Bookmarks</MenuItem>
							<MenuItem onClick={feed}>Feed</MenuItem>
							<MenuItem onClick={notis}>Notifications</MenuItem>
						</MenuList>
						</>
					)}
				</Menu>
			</HStack>
		</Center>
    </ChakraProvider>)
}