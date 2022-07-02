import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccount } from '../interfaces/account.interface';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private _http:HttpClient) { }

  getExam():Observable<IAccount[]>{
    return this._http.get<IAccount[]>(`${environment.url_base}exam`);
  }

  
  reateExam(exam:IAccount):Observable<any>{

    const headers = this._getHeaders();
    return this._http.post<any>(`${environment.url_base}create-exam`, exam, {headers})
    ;
  }

  findExamById(id:number){

  }

  deleteExam(id:number|any):Observable<any>{
    const headers = this._getHeaders();
    return this._http.delete<Observable<any>>(`${environment.url_base}exam/${id}`, {headers});
  }

  updateExam(exam:IAccount|any):Observable<any>{
    const headers = this._getHeaders();
    return this._http.put<Observable<any>>(`${environment.url_base}exam/${exam.id}`
    ,exam ,
     {headers}
    );
  }


  private _getHeaders(): HttpHeaders {
      const headers = new HttpHeaders({
      Headers:environment.headers,
    })

    return headers;
  }
}
