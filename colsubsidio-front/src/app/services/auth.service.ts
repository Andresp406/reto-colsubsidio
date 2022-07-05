import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
  ) { }

  get getToken(): string {
    return localStorage.getItem('x-token') || '';
  }

  get getCurrentUser(): any  {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  get currentID(): number  {
    return this.getCurrentUser.id
  }

  get headers(): any {
    return this._getHeaders();
  }

  login(user: IUser):Observable<any>{
    const url = `${environment.url_base_oauth}/auth/login`;
    const credentials = btoa(environment.credentialsApp);
    const headers =  new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + credentials});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this._http.post<any>(url, params, {headers:headers});
  }

  check():Observable<any> {
    const headers = this._getHeaders();
    const url = `${environment.url_base}/auth/user-logued`;
    return this._http.get<any>(url, {headers});
  }

 


  removeCurrentUser(): boolean {
    localStorage.removeItem('x-token');
    localStorage.removeItem('user');
    localStorage.removeItem('plans');
    //localStorage.removeItem('lang');

    return true;
  }



  checkLogued() {
    const token = localStorage.getItem('x-token') || false;
    const userLogued = localStorage.getItem('user') || false;

    return token && userLogued ? true : false;
  }

  registerUser(user: any): Observable<any>{
    const url = `${environment.url_base}/auth/register`;
    return this._http.post<any>(url, user);
  }

  setUserLocalStorage(data: any): void {
    localStorage.setItem('x-token', data['x-token']);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  setCurrentUserLocalStorage(user: any) {
    console.log('desde el serCurrentUserLocalStorage', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentChannel():Observable<any>{
    const headers = this._getHeaders();
    const url = `${environment.url_base}/channel/show-current-user`;
    return this._http.get<any>(url, {headers});
  }

  updateUser(user:FormData):Observable<any>{
      const headers = this._getHeaders();
      const url = `${environment.url_base}/auth/update`;
      return this._http.post<any>(url, user, {headers});
  }

  getUserNameExist(user:string){
    console.log(user);
    const headers = this._getHeaders();
    const url = `${environment.url_base}/auth/exist-username/${user}`;
    return this._http.get<any>(url, {headers});
  }



  private _getHeaders(): any {
    const token = this.getToken

    if (token.length < 10) {
      this.removeCurrentUser();
      return new HttpHeaders();
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })

    return headers;
  }
}
