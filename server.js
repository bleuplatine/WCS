require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path')

const app = express()

const port = process.env.PORT
const Schema = mongoose.Schema

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'));

// connection to DB 
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .then(() => app.listen(port, () => console.log("Server is running")))
  .catch((err) => console.log(err))

// data schema and model
const listSchema = new Schema({
  name: String,
}, { timestamps: true })

const jasonList = mongoose.model("jasonList", listSchema);


// routes
// get argonauts list
app.get('/argonauts', (req, res) => {
  jasonList.find().sort({ createdAt: -1 })
    .then(argonauts => res.json(argonauts))
    .catch(err => console.log(err))
})

//add argonaut
app.post('/argonauts', (req, res) => {
  const newArgonaut = new jasonList(req.body);
  newArgonaut.save()
    .then(result => console.log('New Argonaut added to DB'))
    .catch(err => console.log(err))
});

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

