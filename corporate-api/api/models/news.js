var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: { type: String },
    news: { type: String },
    date: { type: Date, default: Date.now },
    tags: [{ type: String, lowercase: true }],
    photo: Schema.Types.Mixed
},{collection: 'news'});

newsSchema.pre('save', function (next){
    this.news=this.news.replace(/\n/g, "<br /><br />");
    next();
});

module.exports = mongoose.model('news', newsSchema);