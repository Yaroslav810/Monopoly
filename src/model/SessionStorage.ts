export class SessionStorage {
    constructor(loggedUserId: string) {
        this.loggedUserId = loggedUserId;
    }

    readonly loggedUserId: string
}
