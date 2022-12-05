import  SearchRecipes  from './components/searchRecipes'
import { ChakraProvider, Container} from '@chakra-ui/react';

export const Home = () => {
    return (<ChakraProvider>
        <SearchRecipes/>
        </ChakraProvider>
    );
}
