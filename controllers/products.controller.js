const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

const getAll = async function getAll(req, res){
    let products = await Product.find({user:
        new ObjectId(req.params.userId)});
    res.json({data: products})
}

module.exports = {
    getAll: getAll
}