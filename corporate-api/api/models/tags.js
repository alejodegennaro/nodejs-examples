var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagsSchema = new Schema({
    tags: { type: String, unique:true, lowercase: true }
    },{collection: 'tags'}
);



module.exports = mongoose.model('tags', tagsSchema);