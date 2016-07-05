import {Request, Response, NextFunction} from 'express';
import {UserController} from "../controllers/user-controller";

var express = require('express');
var router = express.Router();
var userController = new UserController();

/* GET users. */
router.get('/', function (req:Request, res:Response, next:NextFunction) {
    var userRequest : getUsersRequest = {
        first:req.header('first'),
        last:req.header('last'),
        email:req.header('email'),
        city:req.header('city'),
        state:req.header('first')
    };
    userController.getUsers(userRequest).then(function (users) {
        res.status(200).json(users).end();
    }, function (err) {
        res.status(300).json(err).end()
    });
});

/* GET a user by id */
router.get('/:id', function (req:Request, res:Response, next:NextFunction) {
    var userRequest:GetUserRequest = {
        id: req.params.id
    };
    userController.getUser(userRequest).then(function (user) {
        res.status(200).json(user).end();
    }, function (err) {
        res.status(300).json(err).end();
    });
});

/* Create a User */
router.post('/', function (req:Request, res:Response, next:Function) {
    var newUser:MongoUser = {
        first: req.body.first,
        last: req.body.last,
        password: req.body.password,
        email: req.body.email,
        admin: null
    };
    userController.createUser(newUser).then(function (user) {
        res.status(200).json(user).end();
    }, function (err) {
        res.status(500).send(err);
    })
});

module.exports = router;
