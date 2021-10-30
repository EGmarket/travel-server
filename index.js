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
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("egTravels");
    const offerCollection = database.collection("offers");
    const honeyCollection = database.collection("honeyTours");
    const popularCollection = database.collection("popularTours");
    const topsCollection = database.collection("topTours");
    const ordersCollection = database.collection("orders");
    const statusCollection = database.collection("status");
   

    //Get Api offer
    app.get("/offers", async (req, res) => {
      const cursor = offerCollection.find({});
      const offers = await cursor.toArray();
      res.json(offers);
    });
    // Get API Honey
    app.get("/honey", async (req, res) => {
      const cursor = honeyCollection.find({});
      const honey = await cursor.toArray();
      res.json(honey);
    });
    // Get API Popular
    app.get("/popular", async (req, res) => {
      const cursor = popularCollection.find({});
      const popular = await cursor.toArray();
      res.json(popular);
    });

    // Get Single Service API
    /* ----------------------------POST-route-start-------------------------------------- */
    //POST Honeymoon API
    app.post("/honey", async (req, res) => {
      const newUser = req.body;
      const result = await honeyCollection.insertOne(newUser);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.json(result);
    });
    //POST Offer/Service API
    app.post("/offers", async (req, res) => {
      const newUser = req.body;
      const result = await offerCollection.insertOne(newUser);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.json(result);
    });
    //POST Popular API
    app.post("/populars", async (req, res) => {
      const newUser = req.body;
      const result = await popularCollection.insertOne(newUser);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.json(result);
    });
    //POST TOP API
    app.post("/tops", async (req, res) => {
      const newUser = req.body;
      const result = await topsCollection.insertOne(newUser);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.json(result);
    });
    /* ---------------END-POST-ROUTE----------------------------------------------- */

    /* --------------GET-ORDER----------------------------------- */
    // Order Insert
    app.post("/orders", async (req, res) => {
      const newOrder = req.body;
      const result = await ordersCollection.insertOne(newOrder);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.send(result);
    });

   /*  app.delete("/deleteProduct/:id", async (req, res) => {
      console.log(req.params.id);
  
      ordersCollection
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
          res.send(result);
        });
    }); */


    // status 

    app.get("/status", async(req,res) => {
      const cursor = statusCollection.find({})
      const status = await cursor.toArray()
      res.send(status);
    })

    

    

    //  Get specific order by using email
    app.get("/orders", async (req, res) => {
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.delete("/deleteOrder/:id", async(req, res) => {
      console.log(req.params.id);
      /* Note: When Inserting Data in my orders collection I can not get ObjectId in DB thats why I Did not use ObjectId, and I don't know what is reason. please tell me why this */
      const result = await ordersCollection.deleteOne({_id:(req.params.id)})
      console.log(result);
      res.send(result);

    })

    app.get("/orders/:email", async (req, res) => {
      const cursor = ordersCollection.find({ email: req.params.email });
      const order = await cursor.toArray();
      res.json(order);
    });

    // get all orders

   // Get Single product by using ID
  //  app.get("/order", async (req, res) => {
  //   const cursor = allOrdersCollection.find({});
  //   const orders = await cursor.toArray();
  //   res.send(orders);
  // });

  // app.get("/order/:id", async(req, res) => {
  //   const id = req.params.id;
  //   const query = { _id: ObjectId(id) };
  //   const result = await allOrdersCollection.findOne(query);
  //   console.log(id);
  //   res.send(result);
  // });

    /* ------------------UPDATE----------------------------------- */
    // get single order 
    app.get("/singleOrder/:id", async(req,res) =>{
      console.log(req.params);
      const result = await ordersCollection.findOne({_id:(req.params.id)});
      res.send(result)
      console.log(result);
    })

    // Full Update
    app.put("/update/:id", async (req, res) => {
      const updated = req.body;
      const filter = { _id:(req.params.id) };
  
      ordersCollection
        .updateOne(filter, {
          $set: {
            name: updated.name,
            country: updated.country,
            city: updated.city,
            duration: updated.duration,
            category: updated.category,
            description: updated.description,
            price: updated.price,
            email: updated.email

          }, 
        })
        .then((result) => {
          res.json(result);
        });
    });

    // status
    app.put("/status/:id", async (req, res) => {
      const id = req.params.id;
      const updated = req.body;
      const filter = { _id:(id) };
  
      ordersCollection
        .updateOne(filter, {
          $set: {
            status: updated.status
          }, 
        })
        .then((result) => {
          res.send(result);
        });

    })

    /* -------------------- Delete --------------------- */
    
   

  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT || port, () => {
  console.log("Server Running on Port", process.env.PORT || port);
});
