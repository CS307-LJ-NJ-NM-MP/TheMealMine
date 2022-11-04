import { TopNav } from '../topNav'
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'



export const Notifications = () => {
    return (<>
        <Container maxW="100%">
            <TopNav/>
            <Center>
                <FormLabel>Notifications</FormLabel>
            </Center>
        </Container>
    </>);
}