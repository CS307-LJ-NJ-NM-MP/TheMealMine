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


app.post('/likeTheRecipe', async(req, res) => {
    const form = {

        user: req.body.user
    }
    
    console.log("user " + form.user)
    console.log("rec " + req.body.recipe)

    var update = {$push:{"likedRecipes": req.body.recipe}};
    var otherUpdate = {$pull:{"likedRecipes": req.body.recipe}};
    var recipeString = "" + req.body.recipe
    console.log("here is recipe " + recipeString)

    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form)
    
    console.log("here is user " + form.user)
    console.log("result data " + result.data)
    
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
//    console.log("recipe: " + result.data.name)
    var projection = {likedRecipes: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
//    console.log("list " + result.data.likedBy)
    res.send(result);
})

app.post('/arrayTest', async(req, res) => {
    const form = {

        user: req.body.user,
        likedRecipes: req.body.recipe
    }

    const newForm = {
        user: req.body.user
    }

    const recipeForm = {
        name: req.body.recipe
    }
    
    console.log("user " + form.user)
    console.log("rec " + req.body.recipe)

    var update = {$push:{"likedRecipes": req.body.recipe}};
    var otherUpdate = {$pull:{"likedRecipes": req.body.recipe}};

    var increaseLike = {$inc: {"likes": 1}};
    var decreaseLike = {$inc: {"likes" : -1}};

    var recipeString = "" + recipeForm.name
    console.log("here is recipe " + recipeString)

    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    if (result == null) {
        console.log("recipe is not there")
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(newForm,update);
        var likeIncrease = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm, increaseLike)
//        console.log(result.likedRecipes.data)
        console.log("now it is")
    }
    else {
        console.log(result.likedRecipes)
        console.log("bye bye")
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(newForm,otherUpdate);
        var likeDecrease = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm, decreaseLike)

    }

    
    console.log("here is user " + form.user)

    
    var projection = {likedRecipes: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
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



app.post('/postComment', async(req, res) => {
    const commentForm = {
        user: req.body.user,
        comment: req.body.comment
    }

    const newForm = {
        user: req.body.user
    }
    const recipeForm = {
        name: req.body.recipe
    }
    
    console.log("user " + commentForm.user)
    console.log("rec " + req.body.recipe)
    console.log("comment " + req.body.comment)
    console.log("recipe btw " + recipeForm.name)


    var result = await client.db("TheMealMine").collection("Recipes").findOne(recipeForm);
    console.log(commentForm)
    var update = {$push:{"comments": commentForm}};
    if (result != null) {
        console.log("adding the comment to the recipe")
        result = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm,update);
    }
    else {
        console.log("recipe doesn't exist how did you get here")
    }


    
    var projection = {comments: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(recipeForm,projection);
//    console.log("list " + result.data.likedBy)
    res.send(result);
})


app.post('/addCategory', async(req, res) => {
    const form = {

        name: req.body.recipe,
        categories: req.body.category
    }

    const newForm = {
        user: req.body.user
    }
    const recipeForm = {
        name: req.body.recipe
    }

    const categoryForm = {
        category: req.body.category
    }
    const categoryCheckForm = {
        category: req.body.category,
        owner: req.body.user,
        recipes: req.body.recipe
    }
    const newCategoryForm = {
        category: req.body.category,
        owner: req.body.user,
        recipes: [req.body.recipe]
    }
    
    console.log("user " + form.user)
    console.log("rec " + req.body.recipe)
    console.log("category " + req.body.category)

    console.log("here is recipe " + recipeString)

    var result = await client.db("TheMealMine").collection("Categories").findOne(categoryForm);

    if (result == null) {
        console.log("adding category")
        result = await client.db("TheMealMine").collection("Categories").insertOne(newCategoryForm);
    }

    else {
        result = await client.db("TheMealMine").collection("Categories").findOne(categoryCheckForm);
        if (result == null) {
            console.log("adding the recipe to the category")
            var recipeUpdate = {$push:{"recipes": req.body.recipe}};
            result = await client.db("TheMealMine").collection("Categories").updateOne(categoryForm,recipeUpdate);
        }
        else {
            console.log("category and recipe exist")
        }
    }

    var update = {$push:{"categories": req.body.category}};
    var otherUpdate = {$pull:{"categories": req.body.category}};
    var recipeString = "" + req.body.recipe

    result = await client.db("TheMealMine").collection("Recipes").findOne(form);
    if (result == null) {
        console.log("category is not there")
        result = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm,update);
        console.log("now it is")
    }

    else {

        console.log(result.categories)
        console.log("category is added")


    }
    
    var projection = {categories: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
//    console.log("list " + result.data.likedBy)
    res.send(result);
})


app.post('/findTheUserReg', async(req, res) => {
    console.log(req.body.search);
    if (req.body.search === '') {
        res.status(400).send('query required');
    }
    const form = {
        user: req.body.search
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

app.post('/getFeed', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result.feed);
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
        notifications: [],
        friends: [],
        feed: [],
		status: 1,
        friendsList: [],
        blockedList: [],
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

app.post('/getFriendsList', async (req,res) => {
    const form = {
        user: req.body.user,
        pass: req.body.pass
    }
    var projection = {friendsList: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    res.send(result.friendsList);
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
    if(friends!==undefined) {
        for(var i = 0; i < friends.length; i++) {
            var ObjectId = require('mongodb').ObjectId;
            const form2 = {_id: new ObjectId(friends[i])}
            result = await client.db("TheMealMine").collection("UserAccounts").findOne(form2);
            let temp = [];
            temp.push(req.body.recipeId);
            let feed = result.feed;
            feed.push(temp);
            var update = {$set:{"feed": feed}};
            result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form2,update);
        }
    }
});

app.post('/updateRecipe', async (req,res) => {
    console.log("Place Update Call Here");
    res.send("Finished");
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

app.post('/unfollow', async (req, res) => {
    console.log("received request to unfollow " + req.body.name);
    var result;
    result = await client.db("TheMealMine").collection("UserAccounts").findOneAndUpdate(
        {user: req.body.user}, 
        {$pull: {'friendsList': req.body.name} },
        {new: true}
    );
    if (result === null) {
        console.log("opps");
    }
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user},
    );
    //console.log(result);
    res.send(result);    
});
app.post('/unblock', async (req, res) => {
    console.log("received request to unblock " + req.body.name);
    var result;
    result = await client.db("TheMealMine").collection("UserAccounts").findOneAndUpdate(
        {user: req.body.user}, 
        {$pull: {'blockedList': req.body.name} },
        {new: true}
    );
    if (result === null) {
        console.log("opps");
    }
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user },
    );
    //console.log(result);
    res.send(result);    
});
/* blocking a user needs a req with a user field, and name, where user
is the account who is blocking name. returns documents of user. 
Will remove friend from friendlist*/
app.post('/blockUser', async (req, res) => {
    console.log("received request to block " + req.body.name);
    var result;
    //Remove from friendList
    result = await client.db("TheMealMine").collection("UserAccounts").findOneAndUpdate(
        {user: req.body.user}, 
        {$pull: {'friendsList': req.body.name} },
        {new: true}
    );
    //Insert name into users blocked list
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.user },
        { $push: {'blockedList': req.body.name}},
    );
    //Find the new document
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user },
    );
    //NOTE: Will have to update local storage of blocked list and friends list on client side
    res.send(result);    
});
app.post('/searchBlockedUser', async (req, res) => {
    console.log("Searching for" + req.body.search);
    var search = req.body.search
    var result;
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user },
    );
    res.send(result);    
});
app.post('/follow', async (req, res) => {
   
    var result;
    
    //Insert name into users blocked list
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.user },
        { $push: {'friendsList': req.body.name}},
    );
    //Find the new document
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user },
    );
    //NOTE: Will have to update local storage of blocked list and friends list on client side
    res.send(result);    
});
app.post('/findUser', async (req, res) => {
   
    var result =  await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user }
    );
    
    res.send(result);    
});
