import { TopNav } from '../topNav'
import { useState } from "react";
import Axios from "axios";
import loginBackground from "../imgs/settingsBackground.jpg"
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
        TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
export function Settings() {
    var id = localStorage.getItem('id');
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var ranking = localStorage.getItem('ranking');
    var image = localStorage.getItem('image');
    var privacySetting = "Private";
    var information = "Forget";
    const [formValue, setFormValue] = useState({
		user: '',
		email: '',
        oldPass: '',
        newPass: '',
        image: '',
        privacy: '',
        remember: ''
	})
    async function privateChange(e) {
        e.preventDefault();
        formValue.privacy = "Private";
        var result = await Axios.post('http://localhost:5000/updateSettings', {
			_id: id,
            user: formValue.user,
            email: formValue.email,
            image: formValue.image,
            oldPass: formValue.oldPass,
            newPass: formValue.newPass,
            privacy: formValue.privacy,
            remember: formValue.remember
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
        privacySetting = "Private";
        formValue.privacy = '';
        document.getElementById("privacyLabel").innerHTML = "Current Status: " + privacySetting;
    }
    async function publicChange(e) {
        e.preventDefault();
        console.log("changing to public")
        formValue.privacy = "Public";
        var result = await Axios.post('http://localhost:5000/updateSettings', {
			_id: id,
            user: formValue.user,
            email: formValue.email,
            image: formValue.image,
            oldPass: formValue.oldPass,
            newPass: formValue.newPass,
            privacy: formValue.privacy,
            remember: formValue.remember
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
        privacySetting = "Public";
        formValue.privacy = '';
        document.getElementById("privacyLabel").innerHTML = "Current Status: " + privacySetting;
        console.log("it's public now")
    }
    async function rememberChange(e) {
        e.preventDefault();
        formValue.remember = "Remember";
        var result = await Axios.post('http://localhost:5000/updateSettings', {
			_id: id,
            user: formValue.user,
            email: formValue.email,
            image: formValue.image,
            oldPass: formValue.oldPass,
            newPass: formValue.newPass,
            privacy: formValue.privacy,
            remember: formValue.remember
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
        information = "Remember";
        formValue.remember = '';
        document.getElementById("informationLabel").innerHTML = "Current Status: " + information;
    }
    async function forgetChange(e) {
        e.preventDefault();
        formValue.remember = "Forget";
        var result = await Axios.post('http://localhost:5000/updateSettings', {
			_id: id,
            user: formValue.user,
            email: formValue.email,
            image: formValue.image,
            oldPass: formValue.oldPass,
            newPass: formValue.newPass,
            privacy: formValue.privacy,
            remember: formValue.remember
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
        information = "Forget";
        formValue.remember = '';
        document.getElementById("informationLabel").innerHTML = "Current Status: " + information;
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
            newPass: formValue.newPass,
            privacy: formValue.privacy,
            remember: formValue.remember
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
                                    <VStack>
                                        <Text id="privacyLabel">Current Status: {privacySetting}</Text>
                                        <Button id="private" onClick={privateChange}>Private</Button>
                                        <Button id="public" onClick={publicChange}>Public</Button>
                                    </VStack>
                                </Center>
                            </TabPanel>
                            <TabPanel>
                                <VStack>
                                    <Text id="informationLabel">Current Status: {information}</Text>
                                    <Button id="remember" onClick={rememberChange}>Remember</Button>
                                    <Button id="forget" onClick={forgetChange}>Forget</Button>   
                                </VStack> 
                            </TabPanel>
                         </TabPanels>
                    </Tabs>
            </Box>
            </Center>
        </Container>
    </ChakraProvider>)
}