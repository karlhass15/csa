var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/consciousshopperdb');

var storeSchema = new Schema({"name": String,
        "address": String,
        "description": String,
        "categories": Array,
        "latlong": Array,
        "website": String,
        "image": String,
        "loc" : Object},
    {collection: 'stores'},
    //schema elements to create spatial elements
    {geometry: {
        coordinates: {type: [Number], index: '2dsphere'}
    }
    });

mongoose.model('Store', storeSchema);
//storeSchema.ensureIndex({loc: "2dsphere"});

//consciousshopperdb.stores.createIndex( {loc : "2dsphere"});

module.exports = mongoose.model('Store');


//'type': {type: String, enum: "Point", default: "Point"},
//'coordinates': {type: [Number], default: [0, 0]},
//index: {type: String, default: '2dsphere'}}