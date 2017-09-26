"use strict";
import session from "express-session";
import connectMongo from "connect-mongo";
import { getCookieSecret } from "./serverSettings.js";

export default function sessionManagementConfig(app, db) {
    session.Session.prototype.login = function (user) {
        const req = this.req;
        /*
        req.session.regenerate(function (err) {
            if (err) {
                console.log("session error", err);
            }
        });
        */
        this.userInfo = user;
    };

    const MongoStore = connectMongo(session);
    const cookiesSecure = getCookieSecure();
    const secret = getCookieSecret();

    app.use('*', session({
        store: new MongoStore({
            mongooseConnection: db,
            ttl: (24 * 60 * 60)
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: (24 * 60 * 60 * 1000)
        },
        name: "id"
    }));

}

function getCookieSecure() {
    return (process.env.NODE_ENV === 'production');
}