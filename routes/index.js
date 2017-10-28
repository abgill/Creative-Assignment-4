var express = require('express');
var router = express.Router();

var board = [];

var currentPlayer = 1;

for(var i = 0; i< 7; i++){
    board.push([]);
    for(var j = 0; j < 6; j++){
        board[i][j] = 0;
    }
}

router.get('/poll', function(req, res, next) {
  res.status(200).json(board);
});

router.post('/turn',function (req, res) {
    console.log('in turn route');
    console.log(req.body);
    res.status(200).json('{data: 3}');
})

module.exports = router;
