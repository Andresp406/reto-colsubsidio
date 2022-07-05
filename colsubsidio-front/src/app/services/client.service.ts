import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClient } from '../interfaces/client.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private _http:HttpClient) { }

  getClients():Observable<any>{
    return this._http.get<IClient[]>(`${environment.url_base}client`).pipe(
      tap((resp:any) =>{
        (resp.content as IClient[]).forEach((cliente)=>{
          console.log(cliente);
        });        
      }),
      map((resp:any) => {
        (resp.content as IClient[]).map(cliente=>{
          cliente.fullName = cliente.fullName.toUpperCase();
          return cliente;
        });
        return resp;
      }),
      tap((resp:any)=>{
        (resp.content as IClient[]).forEach(cliente =>{
          console.log(cliente.fullName);
        })
      })
     );
  }

  findClientById(id:number):Observable<IClient>{
    return this._http.get<IClient>(`${environment.url_base}client/${id}`).pipe(
      catchError(e => {
        Swal.fire('Error al obtener el cliente', e.error.message, 'error');
        return throwError(()=> e);
      })
    );
  }

  registerClient(client:IClient):Observable<IClient>{
    return this._http.post<IClient>(`${environment.url_base}create-client`, client).pipe(
      catchError(e => {
        Swal.fire('Error al registrarse', e.error.message, 'error');
        return throwError(()=> e);
      })
    );
  }

  updateClient(client:IClient|any):Observable<IClient|any>{
    const headers = this._getHeaders();
    return this._http.put<Observable<IClient>>(`${environment.url_base}client/${client.id}`,client , {headers}).pipe(
      catchError(e => {
        Swal.fire('Error al actualizar los datos', e.error.message, 'error');
        return throwError(()=> e);
      })
    );
  }

  deleteClient(id:number|any):Observable<IClient|any>{
    const headers = this._getHeaders();
    return this._http.delete<Observable<IClient>>(`${environment.url_base}client/${id}`, {headers}).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', e.error.message, 'error');
        return throwError(()=> e);
      })
    );
  }

  private _getHeaders(): HttpHeaders {
      return new HttpHeaders({
       Headers:[

       ]
    });
  }
}
