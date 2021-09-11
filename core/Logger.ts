import {writeFileSync} from "fs"

class Logger {
    static log(...str: Array<string>): void {
        writeFileSync(Logger.INFO_FILE, `${str.join(" ")}\n`, {
            flag: "a"
        })
    }

    static error(err: Error|string): void {
        const message = err instanceof Error ? err.stack : err
        writeFileSync(Logger.ERRORS_FILE, `[${new Date()}]\n${message}\n`, {
            flag: "a"
        })
    }

	public static readonly ERRORS_FILE = "./log/errors.log";
	public static readonly INFO_FILE = "./log/info.log";
}

export {
    Logger
}
