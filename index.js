const express = require('express');
const connectToMongo = require('./db/dbconnection');
const app = express();
const port = process.env.PORT|| 5000;
const cors = require("cors");
app.use(cors());
// Sample route
app.use(express.json());

connectToMongo();

app.use('/api',require('./Router/routes'));



// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});