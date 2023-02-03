const express = require('express')
const path = require('path');
const fs = require('fs')
const apiRouter = require('./routes/apiRoutes')
const htmlRouter = require('./routes/htmlRoutes')
const uuid = require('./helpers/uuid');
// const { parse } = require('path');
const PORT = process.env.PORT || 3001;
const app = express()

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use('/', htmlRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  