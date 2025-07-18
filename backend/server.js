const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./database/databaseConnection');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 


connectDatabase();


app.get('/', (req, res) => {

  res.send('API is running...');

});


app.use('/api/v1/newseller',require("./routes/newsletters.route"));


app.use('/api/v1/contact/message',require("./routes/contact.route"));


app.use('/api/v1/admin',require("./routes/admin.route"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`✅ Server is up and listening on http://localhost:${PORT}`);

});