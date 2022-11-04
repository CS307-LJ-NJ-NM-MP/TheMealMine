import Axios from "axios";
import { useState } from "react";
import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { VStack, StackDivider, Button } from '@chakra-ui/react'

function CreateAccount() {
	const [formValue, setFormValue] = useState({
		email: '',
		pass: '',
		user: '',
		image: ''
	})
	const [setConfirmPassword] = useState();
	//ConfirmPassword to be used to compare before submitting
	const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);
	
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

	async function addUser(e) {
		e.preventDefault();
		//console.log("Got here");
		localStorage.setItem('username',formValue.user);
		localStorage.setItem('password',formValue.pass);
		localStorage.setItem('email', formValue.email);
		localStorage.setItem('image', formValue.image);
		
		var result = await Axios.post('http://localhost:5000/signupUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email,
			image: formValue.image
		});
		localStorage.setItem('id',result.data.insertedId);
        localStorage.setItem('ranking',0);
        localStorage.setItem('contribution',0);
        window.location = "/home";
    }
	
return (<>
	<VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing="5px"
            align='stretch'
            color='black'
    > 
		
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
				name="email"
                placeholder='Enter your email'
                onChange={handleChange}
            />    
        </FormControl>  
        <FormControl name="user" isRequired>
            <FormLabel>Username</FormLabel>
            <Input 
				name="user"
                placeholder='Enter your username'
                onChange={handleChange}
            />    
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input 
					name="pass"
                    type={show ? "text " : "password"}
                    placeholder='Enter your password'
                    onChange={handleChange}
                /> 
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        { show ? "Hide" : "Show" }
                    </Button>
                
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input 
                    type={show ? "text " : "password"}
                    placeholder='Confirm password'
                    onChange={ (e)=> setConfirmPassword(e.target.value)}
                /> 
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        { show ? "Hide" : "Show" }
                    </Button>
                
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Upload your picture</FormLabel>
            <Input 
				name="image"
                type="text"
                p={1.5}
                onChange={ handleChange }
            />    
        </FormControl> 
        
        <Button colorScheme="blue"
                width="100%"
                style={{ marginTop : 15}}
                onClick={addUser}>
            Sign Me Up!!!
        </Button>
        
        </VStack>
</>
);}
export default CreateAccount;
