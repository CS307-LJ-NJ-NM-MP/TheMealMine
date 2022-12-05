import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { useState } from "react";
import Axios from "axios";
import recoveryBackground from '../imgs/recoveryBackground.jpeg'
import { ChakraProvider, Container, FormLabel, Center,
    Box, VStack, Button, FormControl, Input, Text, HStack} from '@chakra-ui/react';

export const Recovery = () => {

    const [formValue, setFormValue] = useState({
        user: '',
        email: ''
    })
    
    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function sendEmail(e) {
        e.preventDefault();
		localStorage.setItem('username',formValue.user);
		localStorage.setItem('email',formValue.email);
		await Axios.post('http://localhost:5000/recoverPass', {
            user: formValue.user,
            email: formValue.email
        })
		.then(response => {
			console.log(response.data);
			alert("recovery email sent");
		})
		.catch(error => {
			console.log(error.data);
			alert("error");
		});
    }

    return (<ChakraProvider>
                <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={recoveryBackground} align="center">
                    <TopNav/>
                        <Box m="2%" w="20%" borderRadius="lg" bg="white" padding="10px">
                            <Center>
                                <VStack>
                                <FormLabel>Password Recovery</FormLabel>
                                <FormControl>
				                    <FormLabel>Username</FormLabel>
				                    <Input placeholder='Enter your username' name="user" onChange={handleChange('user')}/>
                                </FormControl>
                                <FormControl>
				                    <FormLabel>Email</FormLabel>
				                    <Input placeholder='Enter your username' name="user" onChange={handleChange('email')}/>
                                </FormControl><br/>
                                <Button onClick={sendEmail}>Submit</Button>
                                </VStack>
                            </Center>
                        </Box>
                </Container>
            </ChakraProvider>
    );
}
