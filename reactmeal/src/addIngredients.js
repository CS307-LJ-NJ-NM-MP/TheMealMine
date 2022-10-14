import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";


export const Pantry = () => {	
return (<>
	<Container maxW='xl' centerContent>
		<Box d='flex'
			justifyContent='center'
			p={3}
			bg={"light grey"}
			w="100%"
			m="40px 0 15px 0"
			borderRadius="lg"
			borderWidth="1px"
		>
			<Text fontSize="1xl" color="black">Search</Text>
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
			<Text fontSize="2xl" color="black">Pantry</Text>
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
			<Text fontSize="4xl" color="black">Database</Text>
		</Box>
	</Container>
</>
);}