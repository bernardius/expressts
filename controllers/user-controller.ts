import * as mongodb from "mongodb";
import {getDb} from "../utils/mongo-utils";
import {MongoError} from "mongodb";
import {Promise} from "es6-promise";
import * as _ from 'lodash';


export class UserController {
    private userCollection():mongodb.Collection {
        return getDb().collection('users');
    }

    public getUsers(query:getUsersRequest):Promise<any> {
        var self = this;
        _.forEach(query, function(v : any, k : any){
            if(_.isNull(v) || !v){
                delete query[k];
            }
        });
        return new Promise(function (resolve, reject) {
            self.userCollection().find(query).toArray().then(function (users) {
                resolve(users);
            }, function (err:MongoError) {
                reject(err);
            });
        });
    }

    public getUser(request:GetUserRequest):Promise<any> {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.userCollection().find({
                _id: new mongodb.ObjectID(request.id)
            }).toArray().then(function (users) {
                if (users.length < 1) {
                    reject('User Not Found');
                }
                resolve(users[0])
            }, function (err) {
                reject(err);
            });
        });
    }

    public getAllUsers():Promise<any> {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.userCollection().find().toArray().then(function (users) {
                resolve(users);
            }, function (err) {
                reject(err);
            });
        });
    }


    public createUser(user:MongoUser):Promise<any> {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (!user.password) {
                reject('password required')
            }
            self.getAllUsers().then(function (existingUsers) {
                var alreadyExists = false;
                existingUsers.forEach(function (existingUser:MongoUser) {
                    if (existingUser.email === user.email) {
                        alreadyExists = true;
                    }
                });
                if (alreadyExists === true) {
                    console.log('already exists')
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
                    })
                }, function (err) {
                    reject(err);
                });
            })
        });
    }
}
