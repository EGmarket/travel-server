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
      const topsCollection = database.collection("topTours");
      const ordersCollection = database.collection("orders");
      
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
      /* ----------------------------POST-route-start-------------------------------------- */
      //POST Honeymoon API
      app.post('/honey', async(req, res) => {
        const newUser = req.body;
        const result = await honeyCollection.insertOne(newUser)
        console.log("got new user", req.body);
        console.log('Added user',result);
        res.json(result)
      });
      //POST Offer/Service API
      app.post('/offers', async(req, res) => {
        const newUser = req.body;
        const result = await offerCollection.insertOne(newUser)
        console.log("got new user", req.body);
        console.log('Added user',result);
        res.json(result)
      });
      //POST Popular API
      app.post('/populars', async(req, res) => {
        const newUser = req.body;
        const result = await popularCollection.insertOne(newUser)
        console.log("got new user", req.body);
        console.log('Added user',result);
        res.json(result)
      });
      //POST TOP API
      app.post('/tops', async(req, res) => {
        const newUser = req.body;
        const result = await topsCollection.insertOne(newUser)
        console.log("got new user", req.body);
        console.log('Added user',result);
        res.json(result)
      });
      /* ---------------END-POST-ROUTE----------------------------------------------- */
    
      /* --------------GET-ORDER----------------------------------- */
      // Order Insert
      app.post('/orders', async(req, res) => {
        const newOrder = req.body;
        const result = await ordersCollection.insertOne(newOrder)
        console.log("got new user", req.body);
        console.log('Added user',result);
        res.json(result)
      });

      // Order Get 

      app.get('/orders', async(req, res)=>{
        const cursor = ordersCollection.find({});
        const order = await cursor.toArray();
        res.json(order);
    })


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