import * as mongodb from "mongodb";
import {mongoUrl} from "../utils/private-constants";

var DB: mongodb.Db;
let url = mongoUrl;
var connection = function(){
  var p1 = new Promise(function(resolve, reject){
    mongodb.MongoClient.connect(url, (err, db) => {
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
var getDb = function() {
  return DB;
};

export {connection, getDb}
