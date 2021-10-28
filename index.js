const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mangomarketecom.gzttn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("egTravels");
      const offerCollection = database.collection("offers");
      const honeyCollection = database.collection("honeyTours");
      const popularCollection = database.collection("popularTours");
      
      //Get Api offer
      app.get('/offers', async(req, res)=>{
          const cursor = offerCollection.find({});
          const offers = await cursor.toArray();
          res.json(offers);
      })
      // Get API Honey
      app.get('/honey', async(req, res)=>{
          const cursor = honeyCollection.find({});
          const honey = await cursor.toArray();
          res.json(honey);
      })
      // Get API Popular
      app.get('/popular', async(req, res)=>{
          const cursor = popularCollection.find({});
          const popular = await cursor.toArray();
          res.json(popular);
      })

      // Get Single Service API

      //POST API
     app.post('/services', async(req, res)=>{
         const service = req.body;
         console.log("hit the post api" , service);
         const result = await volentureCollection.insertOne(service); 
         res.json(result)
     })
    
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send("Server Running");
})

app.listen(process.env.PORT || port ,()=> {
    console.log("Server Running on Port", process.env.PORT || port);
})