import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_TOKEN_COOKIE, USER_DATA } from '../shared/const';
import { User } from './template/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User = null;

  constructor(private cookieService: CookieService) {
    this.user = JSON.parse(localStorage.getItem(USER_DATA));
  }


  getUser(): User {
    return this.user;
  }

  storeUser(user: User): void {
    this.cookieService.set(AUTH_TOKEN_COOKIE, user.authToken);
    user.authToken = '';
    localStorage.setItem(USER_DATA, JSON.stringify(user));
  }

  logout(){
    localStorage.removeItem(USER_DATA);
    this.cookieService.delete(AUTH_TOKEN_COOKIE);
  }
}
