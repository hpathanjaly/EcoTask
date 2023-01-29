const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');
const url = require('url')

const app = express();

const dbURI = "mongodb+srv://Admin:Hari2005@ecotask.r79x3lu.mongodb.net/EcoTask?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected to db.")
    app.listen(3000)})
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(morgan('dev'))
app.use(express.static('public'))
app.use('/', mainRoutes);