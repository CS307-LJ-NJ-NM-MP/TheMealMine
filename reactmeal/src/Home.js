import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
import Pantry from "./addIngredients";
import pantryBackground from './imgs/pantryBackground.jpeg'
import { ChakraProvider, Container} from '@chakra-ui/react';

export const Home = () => {
    return (<ChakraProvider>
            <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={pantryBackground} align="center">
                <TopNav/>
                <div className="home-display">
                    <Pantry/>
                    <SideNav/>
                </div>
            </Container>
        </ChakraProvider>
    );
}
