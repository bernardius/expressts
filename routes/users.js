"use strict";
var user_controller_1 = require("../controllers/user-controller");
var express = require('express');
var router = express.Router();
var userController = new user_controller_1.UserController();
/* GET users. */
router.get('/', function (req, res, next) {
    var userRequest = {
        first: req.header('first'),
        last: req.header('last'),
        email: req.header('email'),
        city: req.header('city'),
        state: req.header('first')
    };
    userController.getUsers(userRequest).then(function (users) {
        res.status(200).json(users).end();
    }, function (err) {
        res.status(300).json(err).end();
    });
});
/* GET a user by id */
router.get('/:id', function (req, res, next) {
    var userRequest = {
        id: req.params.id
    };
    userController.getUser(userRequest).then(function (user) {
        res.status(200).json(user).end();
    }, function (err) {
        res.status(300).json(err).end();
    });
});
/* Create a User */
router.post('/', function (req, res, next) {
    var newUser = {
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
    });
});
module.exports = router;
//# sourceMappingURL=users.js.map