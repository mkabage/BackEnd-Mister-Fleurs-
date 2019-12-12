const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: String,
  img: String,
  amount: Number,
  user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }
})

module.exports = mongoose.model('Product', productSchema);