const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/lendborrow', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/items', itemRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
