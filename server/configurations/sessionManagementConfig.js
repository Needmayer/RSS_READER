"use strict";
import session from "express-session";
import connectMongo from "connect-mongo";

export default function sessionManagementConfig(app, db){
    session.Session.prototype.login = function(user){
        //const req = this.req;
        //req.session.regenerate(function(err){
        //    if(err){
        //        console.log("session error", err);
        //    }
        //})        ;
        this.userInfo = user;
    };

    const MongoStore = connectMongo(session);
    const sessionRoutes = ['/api/loggedUser', '/api/login', '/api/signup', '/api/logout'];
    app.use("*",session({
        store: new MongoStore({
            mongooseConnection: db,
            ttl: (24 * 60 * 60)
        }),
        secret: "kjghkjgh",
        resave: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: (24*60*60*1000)
        },
        name: "id"
    }));
    
}