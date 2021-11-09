export class Player {
    private readonly id!: string;
    private readonly gameId!: string;
    private name!: string;
    private team!: number | null;

    constructor(id: string, gameId: string, name: string, team: number | null) {
        this.id = id
        this.gameId = gameId
        this.name = name
        this.team = team
    }

    public getId(): string {
        return this.id
    }

    public getGameId(): string {
        return this.gameId
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string): void {
        this.name = name
    }

    public getTeam(): number | null {
        return this.team
    }

    public setTeam(team: number): void {
        this.team = team
    }
}
