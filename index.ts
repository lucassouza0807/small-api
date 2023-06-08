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
app.use(cors({
    origin: "http://localhost:3000"
}));

app.listen(process.env.DEV_PORT, () => {
    console.log(`${process.env.DEV_URL}:${process.env.DEV_PORT}`);
})