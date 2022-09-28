const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team17:Team17@themealmine.tlnklwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main() {
	try {
    		await client.connect();
		//Insert code here to access API for MongoDB Atlas
	} catch (e) {
    		console.error(e);
	} finally {
		await client.close();
	}	
}

main().catch(console.error);

async function newEntry(client,table,entry) {
	await client.db("TheMealMine").collection(table).insertOne(entry);
}

async function getEntry(client,table,entryName) {
	return await client.db("TheMealMine").collection(table).findOne({name:entryName});
}

async function editEntry(client,table,entryName,edit) {
	await client.db("TheMealMine").collection(table).updateOne({name:entryName},{$set:edit});
}

async function removeEntry(client,table,entryName) {
	await client.db("TheMealMine").collection(table).deleteOne({name:entryName});
}