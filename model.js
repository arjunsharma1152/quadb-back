const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    name: String,
    last:  Number,
    buy: Number,
    sell: Number,
    volume: Number,
  base_unit: String
});

const Items = mongoose.model('Directory', itemsSchema);

module.exports =  Items;
