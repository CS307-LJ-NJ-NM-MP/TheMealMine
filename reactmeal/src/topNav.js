import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';
import { ChakraProvider, Button, Image, Center, Heading, HStack } from "@chakra-ui/react";

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
   	return (<ChakraProvider>
		<Center>
            <HStack spacing="20px" h="70px" m="0 0 10px 0" bg="transparent">
				<Button bg="transparent"
					borderColor="transparent" borderBlockEndColor="transparent" onClick={home}>
					<Image boxShadow="dark-lg" borderColor="transparent" 
                       	borderRadius='full'
                       	boxSize="50" src={HomeLogo}/>
				</Button>
				<Heading align="center">The Meal Mine</Heading>
				<Button bg="transparent"  
					borderColor="transparent" borderBlockEndColor="transparent" onClick={login}>
					<Image boxShadow="dark-lg" borderColor="transparent" 
                       	borderRadius='full'
                       	boxSize="50" src={image}/>
				</Button>
			</HStack>
		</Center>
    </ChakraProvider>)
}