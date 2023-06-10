require("dotenv").config();
//Server config
const express = require("express");
const app = express();
const cors = require("cors");
import { rateLimit } from "express-rate-limit";
//Routes
import { notFoundHandler } from "@routes/notFoundHandler";
import { api } from "@routes/api";

const limiter = rateLimit({
    windowMs: 15 * 60 * 100, //15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
})

app.use(api);
app.use(notFoundHandler);
app.use(limiter);

app.use((request: Request, response: any, next: any) => {
    response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(process.env.DEV_PORT, () => {
    console.log(`${process.env.DEV_URL}:${process.env.DEV_PORT}`);
})