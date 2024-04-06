import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const TOKEN_KEY='ACCESS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storage: LocalStorageService) { }

  getToken(): string {
    const token = this.storage.retrieve(TOKEN_KEY)
    return token;
  }

  setToken(token: string) {
    this.storage.store(TOKEN_KEY, token);
  }

  token() {
    return {
      Authorization: `Bearer ${this.getToken()}`
    };
  }

  clearToken() {
    this.storage.clear(TOKEN_KEY);
  }


}
