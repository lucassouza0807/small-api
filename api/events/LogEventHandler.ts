import { EventEmitter } from "node:stream";
import { PrismaClient } from "@prisma/client";
import fs from "fs"

const eventEmitter = new EventEmitter();

const logEventHandler = (log_level: string, message: string) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const log: string = `${log_level}: [${date}: ${time}] ${message}`;

    const prisma = new PrismaClient();

    try {
        prisma.appLogs.create({
            data: {
                log_level: log_level,
                message: log,
                date: date,
                time: time
            }
        }).then(() => {
            console.log("Log created")
        })
    } catch (error) {
        if (error) {
            fs.appendFileSync("manual_log.txt", log);
            fs.close;
        }
    }

    prisma.$disconnect()

}

eventEmitter.on("make a log", logEventHandler)