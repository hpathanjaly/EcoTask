const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');
const url = require('url');
const session = require('express-session');

const app = express();
const dbURI = "mongodb+srv://Admin:Hari2005@ecotask.r79x3lu.mongodb.net/EcoTask?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected to db.");
    app.listen(3000);
  })
  .catch(err => console.log(err));

app.set('view engine', 'ejs');


app.use(session({
  secret: 'login',
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  resave: false
}))

app.use(morgan('dev'))
app.use(express.static('public'))
app.use('/', mainRoutes);

module.exports = {
  app,
  mongoose
}