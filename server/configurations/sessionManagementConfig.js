"use strict";
import session from "express-session";
import connectMongo from "connect-mongo";
import { sessionSecret } from "./serverSettings.js";

export default function sessionManagementConfig(app, db) {
    session.Session.prototype.login = function (user) {
        const req = this.req;
        req.session.regenerate(function (err) {
            if (err) {
                console.log("session error", err);
            }
        });
        this.userInfo = user;
    };

    const MongoStore = connectMongo(session);
    const sessionRoutes = ['/api/loggedUser', '/api/login', '/api/signup', '/api/logout'];
    const cookiesSecure = getCookieSecure();

    app.use("*", session({
        store: new MongoStore({
            mongooseConnection: db,
            ttl: (24 * 60 * 60)
        }),
        secret: "kjghkjgh",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: cookiesSecure,
            maxAge: (24 * 60 * 60 * 1000)
        },
        name: "id"
    }));

}

function getCookieSecure() {
    if (process.env.NODE_ENV !== 'production') {
        return false;
    } else {
        return true;
    }
}