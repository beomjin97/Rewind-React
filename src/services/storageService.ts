export class StorageService {
  private TOKEN_KEY: string = "accessToken";

  constructor(private storage: Storage) {}

  setAccessToken(accessToken: string) {
    this.storage.setItem(this.TOKEN_KEY, accessToken);
  }

  getAccessToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  removeAccessToken() {
    this.storage.removeItem(this.TOKEN_KEY);
  }
}
