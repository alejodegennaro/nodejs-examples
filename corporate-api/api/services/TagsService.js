var Tags = require('../models/tags');

function listTags(req, res) {
    Tags.find().lean().select("tags -_id").exec(function (err, result) {
        var resultSet = [];
        result.map(eachResult => {
            resultSet = resultSet.concat(eachResult.tags.split(','));
        })
        res.json(resultSet);
    })
}

function saveTags(req, res) {
    var tagsToSave = req.body.tags;
    console.log(tagsToSave);
    tagsToSave.map(tag => {
        console.log(tag);
        tag.split(',').map(eachTag => {
            var tags = new Tags({
                tags: tag,
            });
            console.log("SAVE : tags");
            tags.save(function (err) {
                if (err) console.log(err);
            });
        })
    });


    console.log('successfully - POST');

}


module.exports = {listTags, saveTags};
