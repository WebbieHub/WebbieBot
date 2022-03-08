import { MongoClient } from "mongodb";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.flfdi.mongodb.net/WebbieBot?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect().then(() => console.log("mongo connected")).catch(console.error);
export default client
