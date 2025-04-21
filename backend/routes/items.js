const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create item
router.post('/', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

// Read all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Update item
router.put('/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// Delete item
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

module.exports = router;