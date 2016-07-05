"use strict";
var mongodb = require("mongodb");
var mongo_utils_1 = require("../utils/mongo-utils");
var es6_promise_1 = require("es6-promise");
var _ = require('lodash');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.userCollection = function () {
        return mongo_utils_1.getDb().collection('users');
    };
    UserController.prototype.getUsers = function (query) {
        var self = this;
        _.forEach(query, function (v, k) {
            if (_.isNull(v) || !v) {
                delete query[k];
            }
        });
        return new es6_promise_1.Promise(function (resolve, reject) {
            self.userCollection().find(query).toArray().then(function (users) {
                resolve(users);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserController.prototype.getUser = function (request) {
        var self = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            self.userCollection().find({
                _id: new mongodb.ObjectID(request.id)
            }).toArray().then(function (users) {
                if (users.length < 1) {
                    reject('User Not Found');
                }
                resolve(users[0]);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserController.prototype.getAllUsers = function () {
        var self = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            self.userCollection().find().toArray().then(function (users) {
                resolve(users);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserController.prototype.createUser = function (user) {
        var self = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!user.password) {
                reject('password required');
            }
            self.getAllUsers().then(function (existingUsers) {
                var alreadyExists = false;
                existingUsers.forEach(function (existingUser) {
                    if (existingUser.email === user.email) {
                        alreadyExists = true;
                    }
                });
                if (alreadyExists === true) {
                    console.log('already exists');
                    return reject('This user/email already exists');
                }
                self.userCollection().insertOne(user).then(function (result) {
                    self.userCollection().find({
                        email: user.email
                    }).toArray().then(function (users) {
                        if (users.length < 1) {
                            reject('User Not Found');
                        }
                        resolve(users[0]);
                    }, function (err) {
                        reject(err);
                    });
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map