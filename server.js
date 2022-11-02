const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team17:Team17@themealmine.tlnklwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {});

console.log("server connected");

const express = require("express");
	app = express(),
  	port = process.env.PORT || 5000,
  	cors = require('cors');

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

require('dotenv').config();

const nodemailer = require('nodemailer');

app.use(cors(corsOptions));

app.use(express.json());
app.listen(port);

app.post('/likeRecipe', async(req, res) => {
    const form = {

        name: req.body.recipe
    }
    
    console.log("user " + req.body.user)
    console.log("rec " + req.body.recipe)

    var update = {$push:{"likedBy": req.body.user}};

    var result = await client.db("TheMealMine").collection("Recipes").findOne(form)
    
    console.log("here is recipe " + form.name)
    console.log("result data " + result.data)
    
    result = await client.db("TheMealMine").collection("Recipes").updateOne(form,update);
//    console.log("recipe: " + result.data.name)
    var projection = {likedBy: 1};
    result = await client.db("TheMealMine").collection("Recipes").findOne(form,projection);
//    console.log("list " + result.data.likedBy)
    res.send(result);
})



app.post('/getRecipes', async(req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result);
});

app.post('/getRecipe', async(req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var recipe = await client.db("TheMealMine").collection("Recipes").findOne(form);
    res.send(recipe);
});

app.post('/findTheUserReg', async(req, res) => {

    if (req.body.user === '') {
        res.status(400).send('query required');
    }
    const form = {
        user: req.body.user
    };
    const projection = {user: 1};
    var string = "" + form.user;
    var list = []
    await client.db("TheMealMine").collection("UserAccounts").find({
        user: {
            $regex : string 
        }
    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            var newString = "" + doc.user
            list.push(newString)

        }
        )
        if (list.length == 0) {
            res.send(null);
        }
        else {
            res.send(list);
        }
    });
});

app.post('/recoverPass', async (req, res) => {
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `themealmine@gmail.com`,
            pass: `vcznrukqedoimrqn`,
        },
    });


    // var pw = client.db("TheMealMine").collection("UserAccounts").find(
    //     {"UserAccounts.email": `${req.body.email}`},
    //     {_id: 0, 'UserAccounts.$': 1}
    // );

    const mailOptions = {
        from: 'themealmine@gmail.com',
        to: `${req.body.email}`,
        subject: `password reset link`,
        text:
            'remember your password next time\n\n'
            + `http://localhost:3000/PWReset\n\n`
            + 'this is a test\n,'
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            res.status(200).json('recovery email sent');
        }
    })
})

app.post('/updatePass', async (req, res) => {
    form = {
        user: req.body.user,
        email: req.body.email
    }

    var update = {$set:{"pass": req.body.pass}};
    var result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    var projection = {pass: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    res.send(result);
});

app.post('/signupUser', async (req, res) => {
	const form = {
    	user: req.body.user,
    	pass: req.body.pass,
    	email: req.body.email,
        image: req.body.image,
        privacy: "Private",
        remember: "Forget",
        pantry: [],
        favoriteRecipes: [],
        personalRecipes: [],

        friends: [],
        feed: [],
		    status: 1,
        ranking: 0,
        contributions: 0

 	};
	var result = await client.db("TheMealMine").collection("UserAccounts").insertOne(form);
    res.send(result);
});

app.post('/deleteUser', async (req) => {
    const form = {
        user: req.body.user,
        pass: req.body.pass
    }
    await client.db("TheMealMine").collection("UserAccounts").deleteOne(form);

});



app.post('/loginUser', async (req,res) => {
	const form = {
		user: req.body.user,
		pass: req.body.pass
	};
	const update = {$set:{"status": 1}}; 
	var result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);

  result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
  res.send(result);
});

app.post('/updatePantry', async (req,res) => {
    const form = {
        user: req.body.user,
    }
    var projection = {pantry: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    var pantry = result.pantry;
    var list = [req.body.name,req.body.qty,req.body.image];
    pantry.push(list);
    var update = {$set:{"pantry": pantry}};
    await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    res.send(result);
});

app.post('/logoutUser', (req,res) => {
	const form = {
		user: req.body.user
	};
	const update = {$set:{"status": 0}}; 
	client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
});

app.post('/updateSettings', (req,res) => {
      var settingNum = req.body.setting;
      var form; var update;
      if(settingNum == 0){
          form = {
              pass: req.body.pass,
              email: req.body.email
          }
          update = {$set:{"user": req.body.user}};
      }else if(settingNum == 1){
          form = {
              user: req.body.user,
              pass: req.body.pass
          }
          update = {$set:{"email": req.body.email}};
      }else if(settingNum == 2){
          form = {
              user: req.body.user,
              email: req.body.email
          }
          update = {$set:{"pass": req.body.pass}};
      }else if(settingNum == 3){
          form = {
              user: req.body.user,
              email: req.body.email,
              pass: req.body.pass
          }
          update = {$set:{"privacy": req.body.privacy}};
      }else if(settingNum == 4){
          form = {
              user: req.body.user,
              email: req.body.email,
              pass: req.body.pass
          }
          update = {$set:{"remember": req.body.remember}};
      }
      client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
});


app.post('/getPantry', async (req,res) => {
    const form = {
        user: req.body.user,
        pass: req.body.pass
    }
    var projection = {pantry: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    console.log(result.pantry);
});

app.post('/updatePicture', (req) => {
    const form = {
        user: req.body.user,
        pass: req.body.pass,
        email: req.body.email
    }
    var update = {$set:{"image": req.body.image}};
    client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
});

app.post('/getIngredients',async (req,res) => {
    const form = {
        user: req.body.user,
        pass: req.body.pass
    }
    var projection = {pantry: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    res.send(result.pantry);
});

app.post('/addRecipes', async (req,res) => {
    const recipe = {
        name: req.body.name,
        owner: req.body._id,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        description: req.body.description,
        likes: 0
    }
    var result = await client.db("TheMealMine").collection("Recipes").insertOne(recipe);
    res.send(result);   
});
app.post('/addRecipeToUser', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    let personalRecipes = result.personalRecipes;
    var ranking = result.ranking+1;
    var contributions = result.contributions+1;
    let temp = [];
    temp.push(req.body.recipeId);
    temp.push(req.body.favorites);
    temp.push(req.body.owner);
    temp.push(req.body.name);
    temp.push(req.body.image);
    temp.push(req.body.instructions);
    temp.push(req.body.description);
    temp.push(req.body.ingredients);
    personalRecipes.push(temp);
    var update = {$set:{"personalRecipes": personalRecipes}};
    result = client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    update = {$set:{"ranking": ranking}};
    result = client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    update = {$set:{"contributions": contributions}};
    result = client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result);
});

app.post('/addToFeeds', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    let friends = result.friends;
    for(var i = 0; i < friends.length; i++) {
        var ObjectId = require('mongodb').ObjectId;
        const form2 = {_id: new ObjectId(friends[i])}
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(form2);
        let temp = [];
        temp.push(req.body.recipeId);
        temp.push(req.body.favorites);
        temp.push(req.body.owner);
        temp.push(req.body.name);
        temp.push(req.body.image);
        temp.push(req.body.instructions);
        temp.push(req.body.description);
        temp.push(req.body.ingredients);
        let feed = result.feed;
        feed.push(temp);
        var update = {$set:{"feed": feed}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form2,update);
    }
});

app.post('/addIngredients', async (req,res) => {
    const form = {
        owner: req.body.user,
    	name: req.body.name
 	}
	client.db("TheMealMine").collection("Ingredients").insertOne(form);
    const userForm = {
        user: req.body.user,
        pass: req.body.pass
    }
    var projection = {pantry: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(userForm,projection);
    let list = [];
    for(var i = 0; i < result.pantry.length; i++) {
        list.push(result.pantry[i]);
    }
    list.push(form);
    var update = {$push:{"pantry": form}};
    client.db("TheMealMine").collection("UserAccounts").updateOne(userForm,update);
});


// app.post('/findUser', async(req, res) => {

//     if (req.body.user === '') {
//         res.status(400).send('query required');
//     }
//     const form = {
//         user: req.body.user
//     };
//     const projection = {user: 1};
//     var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
//     console.log("here is user: " + form.user)
//     console.log("result: " + result)
//     if (result == null) {
//         console.log("error");
//     }
//     else {
//         console.log("success");
//     }
//     res.send(result);
// });

// app.post('/findUserReg', async(req, res) => {

//     if (req.body.user === '') {
//         res.status(400).send('query required');
//     }
//     const form = {
//         user: req.body.user
//     };
//     const projection = {user: 1};
//     var string = "" + form.user;
//     var result = await client.db("TheMealMine").collection("UserAccounts").findOne({
//         user: {
//             $regex : string 
//         }
//     });
//     if (result == null || result.user === undefined) {
//         console.log("error");
//         res.send(null);
//     }
//     else {
//         console.log("success");
//         console.log("here is user: " + form.user)
//         console.log("result: " + result.user)
//         res.send(result);
//     }

// });