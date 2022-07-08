import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/userclass';
import { IResponseUser, IUser } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token!:string;
  private _user:User;

  constructor(
    private _http: HttpClient,
  ) {
    this._user;
   }

  get getToken(): string {
    if (this._token!=null){
      return this._token;
    }else if(this._token == null && localStorage.getItem('x-token') != null){
      return localStorage.getItem('x-token') ;
    }
    return this._token;
  }

  get getCurrentUser(): User  {
    if (this._user != null){
      return this._user;
    }else if((this._user == null || this._user == undefined) && localStorage.getItem('user') != null){
      return JSON.parse(localStorage.getItem('user')) as User;     
    }
     return new User();
  }

  get currentID(): number  {
    return this.getCurrentUser.id
  }

 // get headers(): any {
   // return this._getHeaders();
  //}

  login(user: IUser):Observable<IResponseUser>{
    const url = `${environment.url_base_oauth}`;
    const credentials = window.btoa(environment.credentialsApp);
    console.log('credentials', credentials)
    const headers =  new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + credentials});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this._http.post<IResponseUser>(url, params.toString(), {headers:headers});
  }
  saveUser(accessToken:string):void{
    this._user = new User();
    let payload = this.getDataToken(accessToken);
 
    this._user.fullname = payload.stFullName;
    this._user.username = payload.user_name; 
    this._user.roles = payload.authorities;
    localStorage.setItem('user', JSON.stringify( this._user));
    
  }

  saveToken(accessToken:string):void{
    localStorage.setItem('x-token', accessToken);
  }


  getDataToken(accessToken:string):any{
    if(accessToken!=null){
      let tokenDecrypt = window.atob(accessToken.split(".")[1]);
      return JSON.parse(tokenDecrypt.toString());
    }
    return null;
  }

  /*check():Observable<any> {
    const headers = this._getHeaders();
    const url = `${environment.url_base}/auth/user-logued`;
    return this._http.get<any>(url, {headers});
  }*/

 
  logout(): void {
    this._user = null;
    this._token = null;
    localStorage.clear();  
  }

  isAuthenticated():boolean {
    let payload = this.getDataToken(this.getToken);
    return (payload != null && payload.user_name && payload.user_name.length > 0) ? true : false;
  }



  
  /*updateUser(user:FormData):Observable<any>{
      const headers = this._getHeaders();
      const url = `${environment.url_base}/auth/update`;
      return this._http.post<any>(url, user, {headers});
  }

  getUserNameExist(user:string){
    console.log(user);
    //const headers = this._getHeaders();
    const url = `${environment.url_base}/auth/exist-username/${user}`;
    return this._http.get<any>(url, {headers});
  }*/



 
}
