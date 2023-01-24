const express = require('express');
const morgan = require('morgan');
const mainRoutes = require('./routes/mainRoutes')

const app = express();

app.set('view engine', 'ejs');
app.listen(3000);

app.use(morgan('dev'))
app.use(express.static('public'))
app.use('/', mainRoutes);
