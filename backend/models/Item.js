const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  person: String,
  type: { type: String, enum: ['Lent', 'Borrowed'] },
  dateGiven: Date,
  status: { type: String, enum: ['Pending', 'Returned'], default: 'Pending' }
});

module.exports = mongoose.model('Item', itemSchema);