/**
 * Global server config
 * Entry point
 */

require("dotenv").config();
//Server config
import express from "express";
import session, { SessionOptions, SessionData } from 'express-session';
import path from "node:path";
const app = express();
import { rateLimit } from "express-rate-limit";
//Routes
import { Request, Response } from "express";
import { api } from "@routes/api";
import { web } from "@routes/web";
import { notFoundHandler } from "@routes/notFoundHandler";
//redis
import { createClient } from "redis";
import RedisStore from "connect-redis";
let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "Node-session"
})

//server options
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', true)
app.set('view engine', 'ejs');

interface CustomSessionData extends SessionData {
    first_name?: string,
    username?: string;
    email?: string;
    session_id?: string;

}

declare module 'express-session' {
    interface SessionData {
        user?: {
            session_id: string,
            username: string,
            email: string
        },
    }
}

// Set up session middleware
const sessionOptions: SessionOptions = {
    store: redisStore,
    secret: `${process.env.API_SECRET}`,
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 100, //15 minutes
    max: 50,
    standardHeaders: true,
    legacyHeaders: false
})

app.use((request: Request, response: Response, next: any) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Routes
app.use(limiter);
app.use(api);
app.use(web);
app.use(notFoundHandler);

app.listen(process.env.DEV_PORT, () => {
    console.log(`${process.env.DEV_URL}:${process.env.DEV_PORT}`);
})