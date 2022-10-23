import React from "react";
import loginBackground from "./imgs/loginBackground.jpg"
import { Container, Box, Center, Tabs, TabList, Tab, TabPanels,TabPanel} from "@chakra-ui/react";
import Login from "./components/login";
import CreateAccount from "./components/CreateAccount";

export function SigninPage() {
    return (
            <Container maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={loginBackground} 
                align="center">
                <Center>
                <Box m="10% 0 0 0" bg="white" w="40%" p={4} borderRadius="lg" borderWidth="1px">
                    <Tabs variant="soft-rounded" >
                        <TabList mb="lem">
                            <Tab width="50%">Login</Tab>
                            <Tab width="50%">Create Account</Tab>
                        </TabList>
                         <TabPanels>
                             <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                              <CreateAccount />
                            </TabPanel>
                         </TabPanels>
                    </Tabs>
                </Box>
                </Center>
            </Container>
            
    );

}
export default SigninPage;