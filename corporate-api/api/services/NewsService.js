var News = require('../models/news.js');


function findAll (req, res){
    let limit = null;
    if(req.query.limit && req.query.limit !== ''){
        let number = Number(req.query.limit);
        limit = number !== "NaN"? number: limit;
    }
    News.find().limit(limit).lean().select("title tags date").exec(function(err, result){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
}

function findById (req, res){
    News.findById(req.params.id).lean().exec(function(err, result){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
}

function saveNews (req, res){
    var news = new News({
        title:req.body.title,
        news:req.body.news,
        tags:req.body.tags,
        photo:req.body.photo,
        date:req.body.date
    });
    console.log("SAVE : news");
    news.save(function(err) {
        if (err) throw err;
        res.send("successfully");
        console.log('successfully - POST');
    });
}

module.exports = {findAll, findById, saveNews};{}