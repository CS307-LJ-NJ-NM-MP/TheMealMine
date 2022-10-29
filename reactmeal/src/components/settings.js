import { TopNav } from '../topNav'
import { useState } from "react";
import Axios from "axios";
import loginBackground from "../imgs/settingsBackground.jpg"
import { Box, Button, VStack, HStack, Container, Input, Image, Center, Tabs, TabList, Tab,
        TabPanels, TabPanel, Checkbox, FormLabel} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
export function Settings() {
    var id = localStorage.getItem('id');
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var ranking = localStorage.getItem('ranking');
    var image = localStorage.getItem('image');
    const [formValue, setFormValue] = useState({
		user: '',
		email: '',
        oldPass: '',
        newPass: '',
        image: '',
        private: '',
        public: ''
	})

    async function handlePrivate(e) {
        e.preventDefault();
        formValue.private = 1;
        formValue.public = 0;
    }

    async function handlePublic(e) {
        e.preventDefault();
        formValue.public = 1;
        formValue.private = 0;
    }
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

    async function update(e) {
		e.preventDefault();
            console.log(formValue.email);
        var result = await Axios.post('http://localhost:5000/updateSettings', {
			_id: id,
            user: formValue.user,
            email: formValue.email,
            image: formValue.image,
            oldPass: formValue.oldPass,
            newPass: formValue.newPass
		}); 
        console.log(result);
        if(result !== null){
            username = result.data.user;
            document.getElementById("userLabel1").innerHTML = username;
            document.getElementById("userLabel2").innerHTML = username;
            document.getElementById("user").value = '';
            formValue.user = '';
            email = result.data.email;
            document.getElementById("emailLabel1").innerHTML = email;
            document.getElementById("emailLabel2").innerHTML = email;
            document.getElementById("email").value = '';
            formValue.email = '';
            image = result.data.image;
            document.getElementById("image1").src = image;
            document.getElementById("image2").src = image;
            document.getElementById("image").value = '';
            formValue.email = '';
            document.getElementById("newPass").value = '';
            formValue.newPass = '';
            document.getElementById("oldPass").value = '';
            formValue.oldPass = '';
        }    
	}
    return(<ChakraProvider>
            <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={loginBackground}>
            <TopNav/>
            <Center>
            <Box bg="whiteAlpha.700"
                p={3} m="50px" w="60%"
                borderRadius='lg' align="center">
                <Box bg="white" borderRadius='lg' 
                    p={3} m="0 0 10px 0" w="90%">
                    Settings
                </Box>
                    <Tabs bg="white" borderRadius='lg' 
                        p={3} w="95%" align="center">
                        <TabList>
                            <Tab>Current User Information</Tab>
                            <Tab>Login Information</Tab>
                            <Tab>Profile Picture</Tab>
                            <Tab>Privacy</Tab>
                            <Tab>App</Tab>
                        </TabList>
                         <TabPanels>
                             <TabPanel>
                                <VStack>
                                    <Image id="image1" src={image} borderRadius='full'boxSize='200px'/>
                                    <FormLabel id="userLabel1" >{username}</FormLabel>
                                    <FormLabel id="emailLabel1">{email}</FormLabel>
                                    <FormLabel>Ranking: {ranking}</FormLabel>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing="10px">
                                    <FormLabel id="userLabel2">{username}</FormLabel>
                                    <Input variant="flushed" id="user" name="user" placeholder='Enter New Username' w="50%" onChange={handleChange}/>
                                    <FormLabel id="emailLabel2">{email}</FormLabel>
                                    <Input variant="flushed" id="email" name="email" placeholder='Enter New Email' w="50%" onChange={handleChange}/>
                                    <Input id="newPass" type="password" variant="flushed" name="newPass" placeholder='Enter New Password' w="50%" onChange={handleChange}/>
                                    <Input id="oldPass" type="password" variant="flushed" name="oldPass" placeholder='Confirm With Old Password' w="50%" onChange={handleChange}/>
                                    <Button type="submit" w="40%" onClick={update}>Apply Changes</Button>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                    <Image id="image2" src={image} borderRadius='full'boxSize='200px'/><br/>
                                    <Input id="image" name="image" variant="flushed" placeholder='Enter New Profile Pick URL'
                                        w="50%" onChange={handleChange}/>
                                    <Center>
                                        <Button type="submit" w='40%' onClick={update}>Apply Changes</Button> 
                                    </Center>
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    <HStack>
                                        <Checkbox id="private" name="private" onChange={handlePrivate}>Private to Friends</Checkbox>
                                        <Checkbox id="public" name="public" onChange={handlePublic}>Public</Checkbox>
                                    </HStack>
                                </Center>
                            </TabPanel>
                            <TabPanel>
                                <Checkbox>Remember Me</Checkbox>
                            </TabPanel>
                         </TabPanels>
                    </Tabs>
            </Box>
            </Center>
            </Container>
        </ChakraProvider>)
}