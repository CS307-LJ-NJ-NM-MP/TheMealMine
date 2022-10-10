const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team17:Team17@themealmine.tlnklwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require("express"),
	app = express(),
  	port = process.env.PORT || 5000,
  	cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/signup", (req, res) => {
	console.log("Request Sent");
	main();
	res.send({ message: "We did it!" });
	console.log("Request Received");
});

async function main() {
	client.connect(err => {
		const collection = client.db("TheMealMine").collection("UserAccounts");
		console.log("Connected to Mongo");
  		client.close();
	});
}
