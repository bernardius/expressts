import {Request, Response, NextFunction} from 'express';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.render('index', { title: 'Express-TS' });
});

module.exports = router;
