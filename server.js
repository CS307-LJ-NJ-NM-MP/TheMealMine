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
  	cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

const routes = express.Router();

routes.route("/listings").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("UserAccounts")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

app.post('/addUser', (req, res) => {
	console.log(req.body);
	const query = {user: req.body.user, pass: req.body.pass, email: req.body.email};
	client.db("TheMealMine").collection("UserAccounts").insertOne(query, function (err, result) {});
});

routes.route("/listings/updateUser").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  dbConnect
    .collection("UserAccounts")
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
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
