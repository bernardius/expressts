interface getUsersRequest {
    first:string,
    last:string,
    email:string,
    city:string,
    state:string,
    [key: string]: string;
}

interface GetUserRequest {
    id:string
}

interface MongoUser {
    first: string,
    last: string,
    email: string,
    password: string,
    admin: boolean,
}

interface  LoginRequestObj {
    email: string,
    password: string
}
