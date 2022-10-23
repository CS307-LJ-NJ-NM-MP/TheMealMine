import { useState } from "react";
import Axios from "axios";
import { VStack, StackDivider, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"

function Login()  {
	const [formValue, setFormValue] = useState({
		user: '',
		pass: ''
	})
	const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);
	
	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

	async function login(e) {
		e.preventDefault();
		if(formValue.user !== '' && formValue.pass !== '') {
			localStorage.setItem('username',formValue.user);
			localStorage.setItem('password',formValue.pass);
			console.log("here");
			var result = await Axios.post('http://localhost:5000/loginUser', {
				user: formValue.user,  
				pass: formValue.pass
			});
			localStorage.setItem('email',result.data.email);
			localStorage.setItem('image',result.data.image);
			console.log("got here2");
			localStorage.setItem('pantry',result.data.pantry);
			console.log("got here1");
			window.location = "/home";
		} else {
			//Toast here
		}
	}
	
	function recovery(e) {
		e.preventDefault();
		window.location = '/recovery';
	}
	function guest(e) {
		e.preventDefault();
		localStorage.setItem('username',"Guest");
		localStorage.setItem('password',"Guest");
		localStorage.setItem('email',"Guest");
		localStorage.setItem('pantry',"Guest");
		window.location = "/home";
	}
	function goToReset() {
		window.location = '/PWReset';
	}
	return (
        <VStack
			id="loginForm"
			divider={<StackDivider borderColor='gray.200' />}
            spacing="5px"
            align='stretch'
            color='black'
		>
            <FormControl id="username" isRequired>
				<FormLabel>Username</FormLabel>
				<Input placeholder='Enter your username' name="user" onChange={handleChange}/>
			</FormControl>
			<FormControl id="password" isRequired>				
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input placeholder='Enter your password' name="pass" type={show ? "text" : "password"} 
					onChange={handleChange} />
					<InputRightElement>
						<Button h="1.75rem" size="sm" onClick={handleClick}>
                        { show ? "Hide" : "Show" }
                    	</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			
			<Button colorScheme="blue"
                width="100%"
                style={{ marginTop : 15}}
                onClick={login}>
            	Login
        	</Button>
			<Button colorScheme="red"
                width="100%"
                style={{ marginTop : 15}}
                onClick={guest}>
            	Continue as Guest
        	</Button>
			<Button onClick={recovery}> Forgot Password </Button>
		</VStack>
        	
	);
}
export default Login;
