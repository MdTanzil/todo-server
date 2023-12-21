const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3000;
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.US}:${process.env.PASSWORD}@cluster0.vfbjj6s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const todosCollection = client.db("todo").collection("todos");

app.get("/", (req, res) => {
  res.send("Hello World sdd!");
});
app.get("/todos", async (req, res) => {
  const todos = await todosCollection.find().toArray();
  res.send(todos);
});

app.put("/todos", async (req, res) => {
  const { id, title, description, priority, status, deadline } = req.body;
//   console.log(data);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      title,
      description,
      priority,
      status,
      deadline,
    },
  };
  const result = await todosCollection.updateOne(filter, updateDoc);
//   console.log(result);
  res.send(result);
});



app.delete('/todos/:id', async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId);

    const result = await todosCollection.deleteOne({_id : new ObjectId(taskId)})
    // console.log(id);
    res.send(result)
    
})
app.post

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
