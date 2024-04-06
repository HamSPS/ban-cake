import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.apiUrl = environment.apiURL;
  }

  signIn(body: Object) {
    const url = `${this.apiUrl}/auth/sign-in`;

    return this.http.post<any>(url, body).pipe(
      map((response: any) => {
        if (response.statusCode === 200) return response.data;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    if (token) return true;
    return false;
  }

  getProfile() {
    const url = `${this.apiUrl}/auth/profile`;
    const token = this.tokenService.token();
    return this.http.get<any>(url, { headers: token }).pipe(
      map((response: any) => {
        if (response.statusCode === 200 && response.data) {
          return response.data;
        }
      })
    );
  }

  signOut() {
    this.tokenService.clearToken();
    window.location.reload();
  }
}
