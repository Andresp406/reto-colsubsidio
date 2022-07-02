import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClient } from '../interfaces/client.interface';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private _http:HttpClient) { }

  getClient():Observable<IClient[]>{
    return this._http.get<IClient[]>(`${environment.url_base}client`);
  }

  registerClient(client:IClient):Observable<any>{
    console.log(client);
    const headers = this._getHeaders();
    return this._http.post<any>(`${environment.url_base}create-client`, client, {headers});
  }

  findClientById(id:number){

  }

  deleteClient(id:number|any):Observable<any>{
    const headers = this._getHeaders();
    return this._http.delete<Observable<any>>(`${environment.url_base}client/${id}`, {headers});
  }

  updateClient(client:IClient|any):Observable<any>{
    const headers = this._getHeaders();
    return this._http.put<Observable<any>>(`${environment.url_base}client/${client.id}`,client , {headers});
  }


  private _getHeaders(): HttpHeaders {
      const headers = new HttpHeaders({
      Headers:environment.headers,
    })

    return headers;
  }
}
