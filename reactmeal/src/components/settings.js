import { TopNav } from '../topNav'
import loginBackground from "../imgs/settingsBackground.jpg"
import { Box, Button, VStack, Container, Input, Image, Center, Tabs, TabList, Tab,
        TabPanels, TabPanel, Checkbox, FormLabel} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
export function Settings() {
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var image = localStorage.getItem('image');
    function reload(id) {
        document.getElementById(id).innerText = "Hi";
        document.getElementById(id).contentWindow.location.reload(true);
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
                                    <Image src={image} borderRadius='full'boxSize='200px'/>
                                    <FormLabel>{username}</FormLabel>
                                    <FormLabel>{email}</FormLabel>
                                    <FormLabel>Ranking: 1234</FormLabel>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <VStack spacing="10px">
                                    <FormLabel>{username}</FormLabel>
                                    <Input variant="flushed" placeholder='Enter New Username' w="50%"/>
                                    <FormLabel>{email}</FormLabel>
                                    <Input variant="flushed" placeholder='Enter New Email' w="50%"/>
                                    <Input variant="flushed" placeholder='Enter New Password' w="50%"/>
                                    <Input variant="flushed" placeholder='Confirm New Password' w="50%"/>
                                    <Button w="40%">Apply Changes</Button>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                    <Image src={image} borderRadius='full'boxSize='200px'/><br/>
                                    <Input variant="flushed" placeholder='Enter New Profile Pick URL'
                                        _placeholder={{ opacity: 1, color: 'inherit' }}
                                        w="50%" m="0 0 30px 0"/>
                                    <Center>
                                        <Button w='40%' onClick={reload.bind(this,["Button"])}>
                                            Apply Changes
                                        </Button> 
                                    </Center>
                            </TabPanel>
                            <TabPanel>
                                <VStack>
                                    <Checkbox>Private</Checkbox>
                                    <Checkbox>Private to Friends</Checkbox>
                                    <Checkbox>Public</Checkbox>
                                </VStack>
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