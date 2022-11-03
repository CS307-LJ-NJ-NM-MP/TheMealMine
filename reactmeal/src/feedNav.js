import React, { useState } from "react";
import Axios from "axios";

export const FeedNav = () => {

    function sendRequest(e) {
        console.log("here is a string" + e)
        likePost(e);
    }

    const [formValue, setFormValue] = useState({
		user: ''
	})

    async function likePost(e) {
		e.preventDefault();
        console.log("sending");
        console.log(localStorage.getItem('username'))
        // setFormValue(localStorage.getItem('user'))

		// if(formValue.user !== '') {
        //     console.log("valid: " + formValue.user);
		// 	var result = await Axios.post('http://localhost:5000/findTheUserReg', {
		// 		user: formValue.user,  
		// 	})
        //     .then(response => {
        //         console.log("result: " + response);
        //         if (response.data.length != 0) {
        //             setQuery(response.data);
        //             setTextOut("" + response.data)
        //             setQuery("");
        //         }
        //         else {
        //              setQuery("");
        //              setTextOut("");
        //              alert("error, user not valid")
        //         }

        //     })
        //     .catch(error => {
        //         console.log(error.data)
        //         alert("errors out the ass");
        //     });
		// }
        // else {
        //     alert ("No query");
        // }
	}

    return (
        <>
            <div className="feed">
                <input onClick={sendRequest} type='like' value="Find User" id="friendButton"/>
                {textOut}
            </div>
        </>
    );


}
