var express = require('express');
var router = express.Router();
var model = require('../models/index');
 
/* GET boat listing. */
router.get('/', function (req, res, next) {
    model.boat.findAll({})
        .then(boat => res.json({
            error: false,
            data: boat
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
 
router.get('/', function (req, res, next) {
    model.boat.findAll({})
        .then(boat => res.json({
            error: false,
            data: boat
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});
/* POST todo. */
router.post('/', function(req, res, next) {
 
});
 
 
/* update todo. */
router.put('/:id', function(req, res, next) {
 
});
 
 
/* GET todo listing. */
router.delete('/:id', function(req, res, next) {
 
});
 
module.exports = router;