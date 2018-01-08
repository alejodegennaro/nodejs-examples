/*Routes*/
var express = require('express');
var NewsService = require('../services/NewsService');
var TagsService = require('../services/TagsService');
var MailService = require('../services/MailService');
var router = express.Router();


router.get('/news', function(req, res) {
    console.log("GET : news");
    NewsService.findAll(req, res);
});

router.get('/news/:id', function(req, res){
    console.log("GET : news id :" + req.param.id)
    NewsService.findById(req, res);
});

router.get('/tags', function(req, res){
   TagsService.listTags(req, res);
});

router.post('/email', function(req, res){
    console.log(req.body);
    MailService.sendEmail(req.body)
    res.header({'Access-Control-Allow-Origin': '*'});
    res.send("success");
});

router.post('/news', function(req, res, next) {
    console.log("POST : news");
    console.log(req.body);
    TagsService.saveTags(req, res);
    NewsService.saveNews(req, res);

});

module.exports = router;

