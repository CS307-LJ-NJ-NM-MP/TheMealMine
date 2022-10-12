const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team17:Team17@themealmine.tlnklwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {		
	const collection = client.db("TheMealMine").collection("UserAccounts");
	console.log("Connected to MongoDB");
});

const express = require("express");
	app = express(),
  	port = process.env.PORT || 5000,
  	cors = require('cors');

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json());
app.listen(port, () => console.log("Backend server live on " + port));

const routes = express.Router();

app.post('/signupUser', (req, res) => {
	const form = {
    		user: req.body.user,
    		pass: req.body.pass,
    		email: req.body.email,
        privacy: "Private",
        remember: "Forget",
		    status: 1
 	};
	client.db("TheMealMine").collection("UserAccounts").insertOne(form);
});
 
app.post('/loginUser', (req,res) => {
	const form = {
		user: req.body.user,
		pass: req.body.pass
	};
	const update = {$set:{"status": 1}}; 
	client.db("TheMealMine").collection("UserAccounts").updateOne(form,update);
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

routes.route("/listings/delete/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection("UserAccounts")
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log("1 document deleted");
      }
    });
});