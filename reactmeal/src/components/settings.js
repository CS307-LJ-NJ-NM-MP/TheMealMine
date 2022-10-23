import { TopNav } from '../topNav'
import { Box, Button, Text, Container, Input, InputGroup, 
        InputLeftAddon, Image, Center } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
//#343d46 #4f5b66 #65737e #a7adba #c0c5ce
export function Settings() {
    var username = localStorage.getItem('username');
    var email = localStorage.getItem('email');
    var image = localStorage.getItem('image');
    function reload(id) {
        document.getElementById(id).innerText = "Hi";
        document.getElementById(id).contentWindow.location.reload(true);
    }
    return(<ChakraProvider>
            <Container borderColor="transparent" maxW='100%' h='calc(200vh)' 
                bgGradient='linear(to-br,#343d46 30%, #4f5b66 50%, #65737e 70%, #a7adba 95%)'>
            <TopNav/>
            <Center>
            <Box boxShadow='dark-lg' color="transparent"
                p={3} m="10px" w="95%"
                border='2px' borderRadius='lg'>
                <Box boxShadow='dark-lg'
                    p={3} m="0px 0 15px 0" w='100%'
                    borderColor="transparent"
                    border='2px' borderRadius='lg'  
                    align="center">
                    <Text color='#c0c5ce'>
                        Settings
                    </Text>
                </Box>
                <Box id="Current User Information"
                    boxShadow='dark-lg' borderColor="transparent" 
                    p={3} m="0px 0 15px 0"   
                    border='2px' borderRadius='lg' 
                    align='center'>
                    <Text color='#c0c5ce' m="0px 0 10px 0" >
                        Current User Information
                    </Text>
                    <Image boxShadow="dark-lg" borderColor="transparent" 
                        borderRadius='full' m="0px 0 5px 0"
                        boxSize='100px' src={image}/>
                        <Text color='#c0c5ce'>
                            {username}
                        </Text>
                        <Text color='#c0c5ce'>
                            {email}
                        </Text>
                </Box>
                <Box id="Login Information" 
                    boxShadow='dark-lg'
                    borderColor="transparent" 
                    p={3} m="0px 0 15px 0"   
                    border='2px' borderRadius='lg'
                    align="center">
                    <Text color='#c0c5ce' m="0px 0 10px 0" 
                        align='center'>
                        Login Information
                    </Text>
                    <InputGroup m="10px 0 10px 0" w="350px" borderColor="transparent" color="#c0c5ce">
                        <InputLeftAddon bg="transparent" children="Change Username:"/>
                        <Input variant="flushed" placeholder='Enter New Username'
                            _placeholder={{ opacity: 1, color: 'inherit' }}/>
                    </InputGroup>
                    <InputGroup m="10px 0 10px 0" w="350px" borderColor="transparent" color="#c0c5ce">
                        <InputLeftAddon bg="transparent" children="Change Password:"/>
                        <Input variant="flushed" placeholder='Enter New Password'
                            _placeholder={{ opacity: 1, color: 'inherit' }}/>
                    </InputGroup>
                    <InputGroup m="10px 0 10px 0" w="350px" borderColor="transparent" color="#c0c5ce">
                        <InputLeftAddon bg="transparent" children="Change Username:"/>
                        <Input variant="flushed" placeholder='Enter New Username'
                            _placeholder={{ opacity: 1, color: 'inherit' }}/>
                    </InputGroup>
                    <Center>
                    <Button id="button" bg='transparent' color='#c0c5ce' 
                        w='50%' align='center'
                        onClick={reload.bind(this,["Button"])}>
                        Apply Changes
                    </Button> 
                    </Center>
                </Box>
                <Box id="Current User Information"
                    boxShadow='dark-lg'
                    borderColor="transparent"
                    p={3} m="0px 0 15px 0"   
                    border='2px' borderRadius='lg' 
                    align='center'>
                    <Text color='#c0c5ce' m="0px 0 10px 0" 
                        align='center'>
                        Profile Picture
                    </Text>
                    <InputGroup m="10px 0 10px 0" w="400px" borderColor="transparent" color="#c0c5ce">
                        <InputLeftAddon bg="transparent" children="Change Profile Pick:"/>
                        <Input variant="flushed" placeholder='Enter New Profile Pick URL'
                            _placeholder={{ opacity: 1, color: 'inherit' }}/>
                    </InputGroup>
                    <Center>
                    <Button bg='transparent' color='#c0c5ce' 
                        w='50%' align='center'
                        onClick={reload.bind(this,["Button"])}>
                        Apply Changes
                    </Button> 
                    </Center>
                </Box>
                <Box id="Current User Information"
                    boxShadow='dark-lg'
                    borderColor="transparent"
                    p={3} m="0px 0 15px 0"   
                    border='2px' borderRadius='lg' 
                    align='center'>
                    <Text color='#c0c5ce' m="0px 0 10px 0" 
                        align='center'>
                        Privacy Settings
                    </Text>
                </Box>
            </Box>
            </Center>
            </Container>
        </ChakraProvider>)
}