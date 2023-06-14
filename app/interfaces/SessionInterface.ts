import { SessionData } from "express-session";

export interface SessionCustomData extends SessionData {
    name?: string,
    email?: string,
    session_id?: string
}

declare module 'express-session' {
    interface SessionData {
      username?: string;
    }
  }