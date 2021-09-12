import * as dotenv from "dotenv"
import {Logger} from "./Logger"

class Settings {
    readonly APP_PORT: number;
    readonly DB_HOST: string;
    readonly DB_NAME: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_PORT: number;
  
    constructor() {
        dotenv.config()
        if (!process.env["APP_PORT"] || !process.env["DB_HOST"] 
        || !process.env["DB_NAME"] || !process.env["DB_USER"] 
        || !process.env["DB_PASSWORD"] || !process.env["DB_PORT"]) {
            Logger.error("You need to fill in the .env file")
            throw new Error("No data in .env")
        }
  
        this.APP_PORT = parseInt(process.env["APP_PORT"] as string)
        this.DB_HOST = process.env["DB_HOST"] as string
        this.DB_NAME = process.env["DB_NAME"] as string
        this.DB_USER = process.env["DB_USER"] as string
        this.DB_PASSWORD = process.env["DB_PASSWORD"] as string
        this.DB_PORT = parseInt(process.env["DB_PORT"] as string)
    }
}

const settings = new Settings()
export {settings}
