import { Box, Container, Text, Input, UnorderedList, ListItem, useStatStyles } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

//export const Pantry = () => {
	function Pantry () {
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		var pantry;
		if((username !== null || username !== "Guest") && (password !== null || password !== "Guest")) {
			var userPantry = localStorage.getItem('pantry');
			pantry = userPantry.split(",");
		}else{
			pantry = [];
		}
		const [test, setTest] = useState("hello");
		//setTest("this");
		//console.log(test);
		
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
			<Text>Database</Text>
		</Box>
	</Container>
</>
);}
export default Pantry;
