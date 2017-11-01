var express = require('express');
var router = express.Router();
const igdb = require('igdb-api-node').default;


var saved = [];

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

router.get('/getById', function(req, res, next){
    const client = igdb('b1f2714751612e6965e06ef50b8e851d'),
        fwd = response => {
        //console.log(response.url, JSON.stringify(response.body, null, 2));
        res.status(200).json(response.body);
    };

    var gameId = 0;
    if(req.query.q){
        gameId = parseInt(req.query.q);
    }

    /*
    Search for up to five Zelda games with release dates between 1 Jan and
    31 Dec 2011, sorted by release date in descending order.
    */
    client.games({
        ids : [gameId]
    }, [
        'name',
        'id',
        'release_dates.date',
        'rating',
        'cover'
    ]).then(fwd);

});

router.post('/save', function(req, res, next){
    var newGame = req.body;
    if(newGame && newGame.id && newGame.comment){
        saved.push(newGame);
    }
});

router.get('/getSaved', function(req, res, next){
    res.status(200).json(saved);
});



module.exports = router;
