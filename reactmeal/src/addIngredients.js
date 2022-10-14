import { Box, Button, Container, Text, Input, UnorderedList, ListItem, useStatStyles } from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useState } from "react";

	function Pantry () {
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		var pantry;
		if((username !== null || username !== "Guest") && (password !== null || password !== "Guest")) {
			var userPantry = localStorage.getItem('pantry');
			if(userPantry !== null) {
				pantry = userPantry.split(",");
			}else{
				pantry = [];
			}
		}else{
			pantry = [];
		}
		const [doRender, setDoRender] = useState("render");
		async function handleSearch (e) {
			e.preventDefault();
			//database calls
			console.log(e.target.value);
			var result = await Axios.post('http://localhost:5000/findDatabaseItems', {
				string: e.target.value
			});
			



			//setDoRender(e.target.value);
		}
		
		function refresh() {
			window.location.reload(false);
		}
		function renderPantry(array) {
			return array.map(name => <ListItem>{name}</ListItem>);
		}
		
		const [formValue, setFormValue] = useState({
			name: '',
			qty: ''
		});
		const handleChange = (event) => {
			let value = event.target.value;
			let name = event.target.name;
			setFormValue((prevState) => {
				return {
					...prevState,
					[name]: value
				}
			}); 
		}
		async function addIngred(e) {
			if(formValue.name !== null || formValue.qty !== null){
				console.log("null");
			}
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
			<Input onChange={handleSearch}/><Button onClick={refresh}>Refresh</Button>
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
			<Input placeholder="name" onChange={handleChange}/><Input placeholder="quantity"/><Button onClick={addIngred}>Add</Button>
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
