export interface ISessionManager<SESSION_STORAGE> {
	init(user: SESSION_STORAGE): string;

	delete(token: string): void;

	sessionDataProvider(token: string): SESSION_STORAGE | null;

	verifiedSessionDataProvider(token: string): SESSION_STORAGE;
}