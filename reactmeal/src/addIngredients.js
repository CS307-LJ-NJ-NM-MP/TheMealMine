import { Box, Button, Container, Text, Input, 
	UnorderedList, ListItem, useDisclosure, Modal, ModalOverlay,
	ModalContent, Center, VStack, ModalHeader, FormLabel,
	Divider } from "@chakra-ui/react";
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
		<Container maxW='100%'>
			<Center>
				<Box w='60%' borderRadius="lg" p={1} bg="white" m="2%">
					<Box p={1}>
						<Center>
							<FormLabel m="0 0 10px 0">My Pantry</FormLabel>
						</Center>
						<Input m="0 0 10px 0" name="searchName" placeholder="Search" onChange={handleChange}/>	
						<Center>
							<Button m="0 5px 0 0" w="49%" onClick={handleSearch}>Search</Button>
							<Button m="0 0 0 5px" w="49%" onClick={refresh}>Clear</Button>
						</Center>
					</Box>
					<Center>
						<Divider m="10px 0 10px 0" w='90%' />
					</Center>
					<Box p={1}>
						<Center>
						<FormLabel m="0 0 10px 0">Add to Pantry</FormLabel>
						</Center>
						<Input m="0 0 10px 0" name="name1" placeholder="name" onChange={handleChange}/>
						<Input m="0 0 10px 0" name="qty" placeholder="quantity" onChange={handleChange}/>
						<Input m="0 0 10px 0" name="image1" placeholder="image url" onChange={handleChange}/>
						<Button w="100%" onClick={addIngred}>Add Ingredient</Button>
					</Box>
					<Center>
						<Divider m="10px 0 10px 0" w='90%' />
					</Center>
					<Box p={1}>
						<Center>
						<FormLabel m="0 0 10px 0">Add to TheMealMine</FormLabel>
						</Center>
						<Input m="0 0 10px 0" name="name1" placeholder="name" onChange={handleChange}/>
						<Input m="0 0 10px 0" name="qty" placeholder="quantity" onChange={handleChange}/>
						<Input m="0 0 10px 0" name="image1" placeholder="image url" onChange={handleChange}/>
						<Button w="100%" onClick={addDBIngred}>Add Ingredient</Button>
					</Box>
				</Box>
			</Center>
		</Container>
	</>
);}
export default Pantry;
