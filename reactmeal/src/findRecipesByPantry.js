import React, { useState } from "react";
import Axios from "axios";
import {Button, Container, Input, Center, VStack, Text,
    Box} from '@chakra-ui/react'

export const FindByPantry = () => {
    const [displayList, setList] = useState([]);
    const [isChecked, setChecked] = useState(false);
    

    const recipeItems = displayList.map((name) => 
        <Text>{name}</Text>
    )

    
    async function onClick(e) {
    
        e.preventDefault();
        setChecked(!isChecked)
        console.log("Checked was pressed");
        let pantry = [];
        if (localStorage.getItem("username") === "maddie") { 
            pantry = ["rice", "Fish","Chips","Batter", "Apple", "Dough", "Sugar", "Cinnamon"];
        } else {
            pantry = ["baloney"];
        }
        console.log("Users pantry is: " + pantry);
        let temp = [];
        var isGood = true;
       if (isChecked) {
            //console.log("Doing stuff here " + pantry);
            //If it becomes checked, we should do the search
            var result = await Axios.post('http://localhost:5000/findRecipeWithPantry', {
                pantry: pantry,
            });
            let stuff = result.data;
            console.log(stuff);
            for (var i = 0; i < stuff.length; i++) {
                isGood = true;
                result = await Axios.post('http://localhost:5000/getRecipeIngredients', {
                    name: stuff[i],
                });
               // console.log("Stuff: " + stuff[i]);
                let ingreds = result.data.ingredients;
               // console.log("Ingredient: " + ingreds + " length: " + ingreds.length);
                if (ingreds.length <= pantry.length) {
                   ingreds.forEach((ingr) => {  
                        if (!pantry.includes(ingr)) {
                            //console.log("Ingr: " + ingr + "is not included.");
                            isGood = false;
                        };
                   });
                   if (isGood) {
                   // console.log(result.data.name + ": Its good");
                    temp.push(result.data.name);

                   }
                }
            }

            if (temp.length === 0) {
                temp.push("There is nothing that matches your search.")
            }
            console.log("temp: " + temp);
            setList(temp);
            

       } else {
            //This means that no recipe should display.
            setList([ , ]);
       }
    }




    return (<>
        <Box w="100%">
            <Center>
                <VStack>
                  <Button w="300px" onClick={onClick} id="categoryButton">{isChecked ? "Click to Search By Pantry" : "Below is your possible recipes"}</Button>
                    <VStack id="pantryStack" m="10px 10px 10px 10px" maxH="150px" overflow="hidden" overflowY="scroll"
                    sx={{
                        '&::-webkit-scrollbar': {
                        width: '0px',
                        backgroundColor: `transparent`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `transparent`,
                        },
                    }}>
                    {recipeItems}
                </VStack>
                </VStack>
                
               
            </Center>
        </Box>
        
                
        </>
    );

}