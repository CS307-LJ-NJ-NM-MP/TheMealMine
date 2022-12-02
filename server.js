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



app.post('/findContributedRecipes', async(req, res) => {
    const form = {

        user: req.body.user
    }
    
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form)

    res.send(result.personalRecipes);
})

app.post('/findByCuisine', async(req, res) => {
    console.log(req.body.cuisine);
    if (req.body.cuisine === '') {
        res.status(400).send('query required');
    }
    const form = {
        cuisine: req.body.cuisine
    };
    const projection = {cuisine: 1};
    var string = "" + form.cuisine;
    var list = []
    await client.db("TheMealMine").collection("Recipes").find({
        cuisine: string 

    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            list.push(doc)
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

app.post('/findByAllergens', async(req, res) => {
    console.log(req.body.allergens);
    if (req.body.allergens === '') {
        res.status(400).send('query required');
    }
    const form = {
        allergens: req.body.allergens
    };
    const projection = {allergens: 1};
    var string = "" + form.allergens;
    var list = []
    await client.db("TheMealMine").collection("Recipes").find({
        allergens: string 

    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            list.push(doc)
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

app.post('/findByPrepTime', async(req, res) => {
    console.log(req.body.search);
    if (req.body.search === '') {
        res.status(400).send('query required');
    }
    const form = {
        prepTime: req.body.prepTime
    };
    var string = "" + form.prepTime;
    var prep = parseFloat(string)
    var list = []
    var array = await client.db("TheMealMine").collection("Recipes").find({
        prepTime: {
            $lte : prep
        }
    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            list.push(doc)
            console.log(list)
        }
        )
        if (list.length == 0 || prep <= 0) {
            res.send(null);
            console.log("it's empty")
        }
        else {
            res.send(list);
        }
    });
});


app.post('/findByRating', async(req, res) => {
    console.log(req.body.search);
    if (req.body.search === '') {
        res.status(400).send('query required');
    }
    const form = {
        rating: req.body.rating
    };
    var string = "" + form.rating;
    var ratingInt = parseInt(string)
    var list = []
    var array = await client.db("TheMealMine").collection("Recipes").find({
        rating: {
            $gte : ratingInt
        }
    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            list.push(doc)
        }
        )
        if (list.length == 0 || ratingInt > 5) {
            res.send(null);
        }
        else {
            res.send(list);
        }
    });
});




app.post('/findByDifficulty', async(req, res) => {
    console.log(req.body.search);
    if (req.body.search === '') {
        res.status(400).send('query required');
    }
    const form = {
        difficulty: req.body.difficulty
    };
    var string = "" + form.difficulty;
    var diff = parseInt(string)
    var list = []
    var array = await client.db("TheMealMine").collection("Recipes").find({
        difficulty: {
            $lte : diff
        }
    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            list.push(doc)
        }
        )
        if (list.length == 0 || diff > 5) {
            res.send(null);
        }
        else {
            res.send(list);
        }
    });
});



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
        favoriteRecipes: req.body.recipe
    }

    const newForm = {
        user: req.body.user
    }

    const recipeForm = {
        name: req.body.recipe
    }

    console.log("object id " + req.body.id)

    var userDocument = await client.db("TheMealMine").collection("UserAccounts").findOne(newForm);
    var array = userDocument.feed
//    console.log(array)
    const recipeIds = []
    var ObjectId = require('mongodb').ObjectId;
    for (var i = 0; i < array.length; i++) {
        recipeIds.push(new ObjectId(array[i][0]))
    }

//    console.log(recipeIds)


    console.log("user " + form.user)
    console.log("rec " + req.body.recipe)

    var update = {$push:{"favoriteRecipes": req.body.recipe}};
    var otherUpdate = {$pull:{"favoriteRecipes": req.body.recipe}};

    var string = "" + newForm.user + " liked your post " + recipeForm.name
    console.log("this is the string " + string)
    var pushNotification = {$push:{"notifications": string}}
//    var pullNotification = {$pull:{"notifications": string}}


    var increaseLike = {$inc: {"likes": 1}};
    var decreaseLike = {$inc: {"likes" : -1}};

    var recipeString = "" + recipeForm.name
    console.log("here is recipe " + recipeString)


    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    if (result == null) {
        console.log("recipe is not there")

        result = await client.db("TheMealMine").collection("Recipes").findOne(recipeForm)
        var recipeOwner = result.owner
        console.log(recipeOwner)

        const notificationForm = {
            user: recipeOwner
        }
        
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(newForm,update);
        var likeIncrease = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm, increaseLike)
        var likeNotification = await client.db("TheMealMine").collection("UserAccounts").updateOne(notificationForm, pushNotification)
        console.log("now it is")
    }
    else {
        console.log(result.favoriteRecipes)
        console.log("bye bye")
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(newForm,otherUpdate);

        result = await client.db("TheMealMine").collection("Recipes").findOne(recipeForm)

        // var recipeOwner = result.owner
        // console.log(recipeOwner)

        // const notificationForm = {
        //     user: recipeOwner
        // }

        var likeDecrease = await client.db("TheMealMine").collection("Recipes").updateOne(recipeForm, decreaseLike)
//        var unlikeNotification = await client.db("TheMealMine").collection("UserAccounts").updateOne(notificationForm, pullNotification)

    }

    
    console.log("here is user " + form.user)

    
    var projection = {likedRecipes: 1};
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
//    console.log("list " + result.data.likedBy)
    res.send(result);
})

app.post('/getRatings', async(req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    //Below Line is causing an error)
    const form = {_id: new ObjectId(req.body.recipeId)}
    var result = await client.db("TheMealMine").collection("Recipes").findOne(form);
    res.send(result);
});
app.post('/setRecipeRating', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body.recipeId)}
    console.log(req.body.recipeId);
    console.log(req.body.rating);
    var result = await client.db("TheMealMine").collection("Recipes").findOne(form);
    var rating = parseInt(result.rating);
    rating = ""+((rating+parseInt(req.body.rating))/2);
    var update = {$set:{"rating": rating}};
    result = await client.db("TheMealMine").collection("Recipes").updateOne(form,update);
    res.send(rating);
});

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
        category: req.body.category,
        owner: req.body.user
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
    res.send(result);
})

app.post('/findTheUserReg', async(req, res) => {
    if (req.body.search === '') {
        res.send(null);
    }
    var form;
    if(isNaN(req.body.search)){
        form = {
            user: { $regex : req.body.search },
            blockedList: { $ne: st }
        }
    }else{
        var string = parseInt(req.body.search);
        form = {
            ranking: string,
            blockedList: { $ne: st }
        }
    }
    var list = []
    var st = "" + req.body.user;
    await client.db("TheMealMine").collection("UserAccounts").find(form
        ).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            if(doc.privacy + "" !== "Private"){
                list.push([doc._id,doc.image,doc.user,doc.ranking]);
            }
        });
        if (list.length == 0) {
            res.send(null);
        }else {
            res.send(list);
        }
    });
});

app.post('/findTheRecReg', async(req, res) => {
    if (req.body.search === '') {
        res.status(400).send('query required');
    }
    const form = {
        name: req.body.search
    };
    const projection = {name: 1};
    var string = "" + form.name;
    var list = []
    await client.db("TheMealMine").collection("Recipes").find({
        name: {
            $regex : string 
        }
    }).toArray(function(err, docs) {
        docs.forEach(function(doc) {
            var newString = "" + doc.name
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
    console.log(result.feed);
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
        requestedBy: [],
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

app.post('/updateSettings', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result;
    if(req.body.user !== ''){
        const update = {$set:{"user": req.body.user}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    }
    if(req.body.email !== ''){
        const update = {$set:{"email": req.body.email}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update); 
    }
    if(req.body.image !== ''){
        const update = {$set:{"image": req.body.image}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    }
    if(req.body.oldPass !== '' && req.body.newPass !== ''){
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
        
        if(result.pass === req.body.oldPass){
            const update = {$set:{"pass": req.body.newPass}};
            result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
        }
    }
    if(req.body.privacy !== '') {
        const update = {$set:{"privacy": req.body.privacy}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    }
    if(req.body.remember !== '') {
        const update = {$set:{"remember": req.body.remember}};
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
    }
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result);
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

app.post('/getFriendRanks', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result);
});

app.post('/getFriends', async (req,res) => {
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body._id)}
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    res.send(result.friends);
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

    var categoryArray = []
    if (req.body.categories == '') {
        console.log("no categories")
    }
    else {
        console.log("there be categories yargh")
        console.log(rea.body.categories)
        temporaryCategoryArray = req.body.categories.split(",")
        for (var i = 0; i < req.body.categories.length; i++) {
            categoryArray.push(temporaryCategoryArray[i])
        }

    }

    var finalAllergyList = []
    console.log(req.body.allergens)
    if (req.body.allergens == undefined) {
        console.log('no allergies')

    }
    else {
        let allergensArray = req.body.allergens.split(",")

        if (req.body.allergens !== null) {
            for (var i = 0; i < allergensArray.length; i++) {
                finalAllergyList.push(allergensArray[i])
            }
            console.log("there are allergies")
            console.log(finalAllergyList)
        }
        else {
            console.log("no allergies")
        }
    }
    const prepTimeInHrs = parseFloat(req.body.prepTime)
    const difficultyInt = parseInt(req.body.difficulty)
    let temp = req.body.ingredients.split(",");
    console.log("categories")
    console.log(categoryArray)
    const recipe = {
        name: req.body.name,
        owner: req.body._id,
        image: req.body.image,
        rating: 0,
        instructions: req.body.instructions,
        ingredients: temp,
        description: req.body.description,
        comments: ["No Comments"],
        likes: 0,
        categories: categoryArray,
        prepTime: prepTimeInHrs,
        difficulty: difficultyInt,
        cuisine: req.body.cuisine,
        allergens: finalAllergyList
    }

    var resultingRecipe = await client.db("TheMealMine").collection("Recipes").insertOne(recipe);

    if (categoryArray.length > 0) {

        for (var i = 0; i < categoryArray.length; i++) {

            const form = {
                name: req.body.name,
                categories: categoryArray[i]
            }
        
            const recipeForm = {
                name: req.body.name
            }
        
            const categoryForm = {
                category: categoryArray[i],
                owner: req.body.username
            }
            const categoryCheckForm = {
                category: categoryArray[i],
                owner: req.body.username,
                recipes: req.body.name
            }
            const newCategoryForm = {
                category: categoryArray[i],
                owner: req.body.username,
                recipes: [req.body.name]
            }
        
        
            var result = await client.db("TheMealMine").collection("Categories").findOne(categoryForm);
        
            if (result == null) {
                console.log("adding category")
                result = await client.db("TheMealMine").collection("Categories").insertOne(newCategoryForm);
            }
        
            else {
    
                result = await client.db("TheMealMine").collection("Categories").findOne(categoryCheckForm);
                if (result == null) {
                    console.log("adding the recipe to the category")
                    var recipeUpdate = {$push:{"recipes": req.body.name}};
                    result = await client.db("TheMealMine").collection("Categories").updateOne(categoryForm,recipeUpdate);
                }
                else {
                    console.log("category and recipe exist")
                }
            }
        
            var update = {$push:{"categories": categoryArray[i]}};
        
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
        
        }
    }
    res.send(resultingRecipe);   
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
    if (req.body.categories !== '') {
        temp.push(req.body.categories);
    }
    else {
        temp.push("None")
    }

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

app.post('/postComment', async (req,res) => {
    console.log(req.body.recipeId);
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body.recipeId)}
    var result = await client.db("TheMealMine").collection("Recipes").findOne(form);
    let newArr = [];
    if(result.comments[0] === "No Comments") {
        let temp = [];
        temp.push(req.body.user);
        temp.push(req.body.comments);
        newArr = result.comments;
        newArr[0] = temp;
    }else{
        let temp = [];
        temp.push(req.body.user); temp.push(req.body.comments); 
        newArr = result.comments;
        newArr.unshift(temp);
    }
    var update = {$set:{"comments": newArr}};
    await client.db("TheMealMine").collection("Recipes").updateOne(form,update);
});

app.post('/getComments',async (req,res) => {
    console.log(req.body.recipeId);
    var ObjectId = require('mongodb').ObjectId;
    const form = {_id: new ObjectId(req.body.recipeId)}
    var result = await client.db("TheMealMine").collection("Recipes").findOne(form);
    res.send(result.comments);
});

app.post('/addToFeeds', async (req) => {
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
            temp.push(req.body.favorites);
            temp.push(req.body.owner);
            temp.push(req.body.name);
            temp.push(req.body.image);
            temp.push(req.body.instructions);
            temp.push(req.body.description);
            temp.push(req.body.ingredients);
            let feed = result.feed;
            feed.unshift(temp);
            var update = {$set:{"feed": feed}};
            result = await client.db("TheMealMine").collection("UserAccounts").updateOne(form2,update);
        }
    }
});

app.post('/updateRecipe', async (req,res) => {
    let temp = req.body.ingredients.split(",");
    const newForm = {
        name: req.body.name,
        instructions: req.body.instructions,
        description: req.body.description,
        ingredients: temp
    }
    
    const form = {
        owner: req.body.owner,
        name: req.body.name
    }
    const userForm = {
        user: req.body.username
    }



    console.log("name " + newForm.name)
    console.log("instructions " + newForm.instructions)
    console.log("description " + newForm.description)
    console.log("ingredients " + newForm.ingredients)
    console.log("user " + req.body.owner)

    

    var instructionUpdate = {
        $set: {"instructions": newForm.instructions}
    };

    var descriptionUpdate = {
        $set: {"description": newForm.description}
    };

    var ingredientUpdate = {
        $set:{"ingredients": newForm.ingredients}
    };

    if (newForm.instructions !== '') {
        var result = await client.db("TheMealMine").collection("Recipes").updateOne(form,instructionUpdate);
    }

    if (newForm.description !== '') {
        var result = await client.db("TheMealMine").collection("Recipes").updateOne(form,descriptionUpdate);
    }

    if (newForm.ingredients !== '') {
        var result = await client.db("TheMealMine").collection("Recipes").updateOne(form,ingredientUpdate);
    }

    newPersonalRecipesList = []
    for (var i = 0; i < req.body.newList.length; i += 9) {
        newSubList = []
        newSubList.push(req.body.newList[i])
        newSubList.push(req.body.newList[i + 1])
        newSubList.push(req.body.newList[i + 2])
        newSubList.push(req.body.newList[i + 3])
        newSubList.push(req.body.newList[i + 4])
        newSubList.push(req.body.newList[i + 5])
        newSubList.push(req.body.newList[i + 6])
        newSubList.push(req.body.newList[i + 7])
        newSubList.push(req.body.newList[i + 8])

        console.log(newSubList)
        newPersonalRecipesList.push(newSubList)
    }
    
    console.log(newPersonalRecipesList)

    var update = {
        $set: {"personalRecipes": newPersonalRecipesList}
    }

    var result = await client.db("TheMealMine").collection("UserAccounts").updateOne(userForm, update);
    res.send(result);
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
    var str;
    //Find the person we are unfollowing so that we can get its object id to pull out of friends
    
    //Take user out of unfollowed persons 'friends'
    str = "" + req.body.id;
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        {user: req.body.name}, 
        {$pull: {'friends': str}},
        {new: true}
    );
    //Remove friend from users friendList
     result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        {user: req.body.user}, 
        {$pull: {'friendsList': req.body.name}},
        {new: true}
    );
    //Reget users friends
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user},
    );
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
    var str = "" + req.body.id;
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
    //Remove my Id from their list
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.name },
        { $pull: {'friends': str}}
    );
    //Find them
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        {user: req.body.name }
    );
    str = "" + result._id;
    //Remove their Id from my 'friends'
    result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.user},
        { $pull: {'friends': str} }
    )
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
    //Called from FriendsPage.js
    //If name is returned it means there was a friend request sent
    //If username is returned it means there was a friend 
    
    console.log("received request to follow " + req.body.name);
    var result;
    var str;
    //Search for user we are requesting
    result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.name }
    );
    if (result.privacy === "Private") {
        console.log(req.body.name + " is private.");
        //Add req.body.user to "requestBy" for req.body.name
        await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.name },
            { $push: {'requestedBy': req.body.user}}, 
        );
        //Send a notification to the requested name. 
        str = req.body.user + " has requested to follow you.";
        await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.name },
            { $push: {'notifications': str}} 
        )
        
        res.send(result); 
    }  else {
        //If the friend is not private, add them.
        str = req.body.user + " has followed you.";
        //Send message to friend and add users id to the friends 'friends' list
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.name},
            { $push: {'notifications': str, 'friends': "" + req.body.id}}
        )
        //uddate the users friends list
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.user },
        { $push: {'friendsList': req.body.name}},
        );

        //Find the user again to get the new friendLit.
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user },
        );
        res.send(result);
    } //End if else
  
        
});
app.post('/acceptRequest', async (req, res) => {
    //Req Needs to be hold... (aka the client side must send...)
    /* "user" is the client
        "name" is the person requesting to be friends with the client/user
        "id" is the object id of the user/client, so that it can be placed in the requestors "friends" list
    */
    var result;
    var str;
    if (req.body.state === "accept") {
        str = req.body.user + " has accepted your friend request.";
        console.log(str);
        //Update the requesters friendslist to include this user and notify.
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.name },
            { $push: 
                {'friendsList': req.body.user, 'notifications': str, 'friends': req.body.id },
            }
        );
        //Find the requestor so we can pull their object _id and add to this users 'friends'
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(
            { user: req.body.name }
        )
        console.log(result);
        //str = "" + result.data.user;
       // console.log("Pushing: " + result.data. + "onto " + req.body.user);
        //Update this user, by removing requestor from 'requestedBy' and push their id onto this 
        //users 'friends'
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.user },
            { $pull: {'requestedBy': req.body.name}},
        );
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.user },
            { $push: {'friends': str}}
        );
        //Find the result.
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(
            { user: req.body.user }
        );
    } else { //If they denied.
        str = req.body.user + " has denied your friend request.";
        console.log(str);
        result = await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.user },
            { $pull: {'requestedBy': req.body.name}}
        );
        await client.db("TheMealMine").collection("UserAccounts").updateOne(
            { user: req.body.name },
            { $push: {'notifications': str}}
        );
        result = await client.db("TheMealMine").collection("UserAccounts").findOne(
            { user: req.body.user }
        );
        //remove from requestedBy List.
        //Send notification to denied user,
        //find user again and send back user.
    }
    res.send(result);
});
app.post('/findUser', async (req, res) => {
   
    var result =  await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user }
    );
    
    res.send(result);    
});
app.post('/removeNotif', async (req, res) => {
   
    var result =  await client.db("TheMealMine").collection("UserAccounts").updateOne(
        { user: req.body.user  },
        { $pull: {'notifications':req.body.message}  }
    );
    /*result =  await client.db("TheMealMine").collection("UserAccounts").findOne(
        { user: req.body.user }
    );*/
    
});

/*
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
    if (result !== null) {
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
})*/