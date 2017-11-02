var express = require('express');
var router = express.Router();
const igdb = require('igdb-api-node').default;


var saved = [{id: 3122}];

router.get('/search', function(req, res, next){
    const client = igdb('b1f2714751612e6965e06ef50b8e851d'),
        fwd = response => {
        //console.log(response.url, JSON.stringify(response.body, null, 2));
        res.status(200).json(response.body);
    };

    var searchTerm = ' ';
    if(req.query.q){
        searchTerm = req.query.q;
    }

    /*
    Search for up to five Zelda games with release dates between 1 Jan and
    31 Dec 2011, sorted by release date in descending order.
    */
    client.games({

        limit: 40,
        offset: 0,
        search: searchTerm
    }, [
        'name',
        'id',
        'release_dates.date',
        'rating',
        'cover'
    ]).then(fwd);

});

router.get('/getSaved', function(req, res, next){
    if(saved.length <= 0){
        res.status(200).json('[]');
        res.end();
        return;
    }

    const client = igdb('b1f2714751612e6965e06ef50b8e851d'),
        fwd = response => {
        //console.log(response.url, JSON.stringify(response.body, null, 2));
        res.status(200).json(response.body);
        res.end();
    };

    var ids = [];
    for(var i = 0; i < saved.length; i++){
        ids.push(saved[i].id);
    }

    console.log(ids);

    console.log(saved);

    client.games({
        ids : ids
    }, [
        'name',
        'id',
        'release_dates.date',
        'rating',
        'cover'
    ]).then(fwd);

});

router.post('/save', function(req, res){
    saved.push(req.body)
    res.status(200).json(saved);
});

router.post('/remove', function(req, res){
    var id = req.query.q;

    for(var i = 0; i < saved.length; i++){
        if(saved[i].id == req.query.q){
            saved.splice(i,1);
            break;
        }
    }

    res.status(200).json('{status: success}');
});




module.exports = router;
