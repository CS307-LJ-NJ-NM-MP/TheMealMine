import { Box, Container, Text, Input, UnorderedList, ListItem } from "@chakra-ui/react";
import React from "react";

export const Pantry = () => {
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		var userPantry = localStorage.getItem('pantry');
		var pantry = userPantry.split(",");
		function renderPantry(array) {
			return array.map(name => <ListItem>{name}</ListItem>);
		}
return (<> 
	<Container align="center" maxW='xl' centerContent>
		<Box d='flex'
			justifyContent='center'
			p={3}
			bg={"light grey"}
			w="100%"
			m="40px 0 15px 0"
			borderRadius="lg"
			borderWidth="1px"
		>
			<Input placeholder='Search Ingredients'/>
		</Box>
		<Box d='flex'
			justifyContent='center'
			p={3}
			bg={"light grey"}
			w="100%"
			m="40px 0 15px 0"
			borderRadius="lg"
			borderWidth="1px"
		>
			<Text>My Pantry</Text>
			<UnorderedList>{renderPantry(pantry)}</UnorderedList>
			
		</Box>
		<Box d='flex'
			justifyContent='center'
			p={3}
			bg={"light grey"}
			w="100%"
			m="40px 0 15px 0"
			borderRadius="lg"
			borderWidth="1px"
		>
			<Text>My Pantry</Text>
		</Box>
	</Container>
</>
);}
