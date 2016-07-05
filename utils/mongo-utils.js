"use strict";
var mongodb = require("mongodb");
var private_constants_1 = require("../utils/private-constants");
var DB;
var url = private_constants_1.mongoUrl;
var connection = function () {
    var p1 = new Promise(function (resolve, reject) {
        mongodb.MongoClient.connect(url, function (err, db) {
            if (!err) {
                DB = db;
                resolve(DB);
            }
            else {
                reject(err);
            }
        });
    });
    return p1;
};
exports.connection = connection;
var getDb = function () {
    return DB;
};
exports.getDb = getDb;
//# sourceMappingURL=mongo-utils.js.map