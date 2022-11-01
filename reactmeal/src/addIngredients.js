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
				pantry = userPantry.split(",,");
			}else{
				pantry = [];
			}
		}else{
			pantry = [];
		}

		const [doRender, setDoRender] = useState("render");
		async function handleSearch (e) {
			e.preventDefault();
			var result = await Axios.post('http://localhost:5000/getPantry', {
				user: username,
				pass: password
			});
			pantry = result.data;
			setDoRender(e.target.value);
		}
		
		function refresh() {
			window.location.reload(false);
		}

		function renderPantry(array) {
			return array.map(name => <ListItem><Text>{name.split(",")[0]} {name.split(",")[1]}</Text><img width="50" height="50" src={name.split(",")[2]}/></ListItem>);
		}

		function renderDatabase(array) {
			
			return array.map(name => <ListItem><Text>{name[0]}</Text>{name}</ListItem>);
		}

		const [formValue, setFormValue] = useState({
			name1: '',
			qty: '',
			image1: '',
			name2: '',
			image2: '',
			searchName: ''
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
			e.preventDefault();
			var result = await Axios.post('http://localhost:5000/updatePantry', {
				user: username,
				name: formValue.name1,
				qty: formValue.qty,
				image: formValue.image1
			});
			console.log(result.data);
			localStorage.setItem('pantry',result.data);
		}

		async function addDBIngred(e) {
			e.preventDefault();
			await Axios.post('http://localhost:5000/addDatabaseItem', {
				name: formValue.name2,
				image: formValue.image2
			});
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
			<Input name="searchName" onChange={handleChange}/><Button onClick={handleSearch}>Submit</Button><Button onClick={refresh}>Refresh</Button>
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
			<Input name="name1" placeholder="name" onChange={handleChange}/>
			<Input name="qty" placeholder="quantity" onChange={handleChange}/>
			<Input name="image1" placeholder="image url" onChange={handleChange}/>
			<Button onClick={addIngred}>Add</Button>
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
			<UnorderedList></UnorderedList>
			<Input name="name2" placeholder="name" onChange={handleChange}/>
			<Input name="image2" placeholder="image url" onChange={handleChange}/>
			<Button onClick={addDBIngred}>Add</Button>
		</Box>
	</Container>
</>
);}
export default Pantry;
