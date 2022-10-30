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

app.post('/findUser', async(req, res) => {

    if (req.body.user === '') {
        res.status(400).send('query required');
    }
    const form = {
        user: req.body.user
    };
    const projection = {user: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form);
    console.log("here is user: " + form.user)
    console.log("result: " + result)
    if (result == null) {
        console.log("error");
    }
    else {
        console.log("success");
    }
    res.send(result);
});

app.post('/findUserReg', async(req, res) => {

    if (req.body.user === '') {
        res.status(400).send('query required');
    }
    const form = {
        user: req.body.user
    };
    const projection = {user: 1};
    var string = "" + form.user;
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne({
        user: {
            $regex : string 
        }
    });
    if (result == null || result.user === undefined) {
        console.log("error");
        res.send(null);
    }
    else {
        console.log("success");
        console.log("here is user: " + form.user)
        console.log("result: " + result.user)
        res.send(result);
    }

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
    var result = await client.db("TheMealMine").collection("UserAccounts").find({
        user: {
            $regex : string 
        }
    });
    while (result.hasNext) {
        console.log("resulting data" + result.readBufferedDocuments())
        result = result.next()
    }
    if (result == null || result.user === undefined) {
        console.log("error");
        res.send(null);
    }
    else {
        console.log("success");
        console.log("here is user: " + form.user)
        console.log("result: " + result.user)
        res.send(result);
    }

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

    console.log('sending');

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            console.log('here is the res: ', response);
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

app.post('/signupUser', (req, res) => {
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
		status: 1
 	};
	client.db("TheMealMine").collection("UserAccounts").insertOne(form);
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
    const projection = {email: 1,image: 1,pantry: 1};
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

app.post('/getRecipes', async (req,res) => {
    var recipeNum = req.body.recipe; var projection;
    const form = {
        user: req.body.user,
        pass: req.body.pass
    }
    if(recipeNum == 0) {
        projection = {favoriteRecipies: 1};
    }else{
        projection = {personalRecipies: 1};
    }
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(form,projection);
    if(recipeNum == 0){
        res.send(result.favoriteRecipies);
    }else{
        res.send(result.personalRecipies);
    }
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
    const form = {
        owner: req.body.user,
    	name: req.body.name
 	}
	client.db("TheMealMine").collection("Recipes").insertOne(form);
    const userForm = {
        user: req.body.user,
        pass: req.body.pass
    }
    var projection = {personalRecipes: 1};
    var result = await client.db("TheMealMine").collection("UserAccounts").findOne(userForm,projection);
    let list = [];
    for(var i = 0; i < result.personalRecipes.length; i++) {
        list.push(result.personalRecipes[i]);
    }
    list.push(form);
    var update = {$push:{"personalRecipes": form}};
    client.db("TheMealMine").collection("UserAccounts").updateOne(userForm,update);
    
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
