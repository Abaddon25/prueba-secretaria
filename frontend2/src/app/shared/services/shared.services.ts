import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class SharedService {
   urlServer: string = environment.server_api_url;

   subject = new Subject<any>();
   resetDataSubject = this.subject.asObservable();

   constructor(public http: HttpClient) {}

   getAll = (nameService: string): Observable<any> => this.http.get<any>(`${this.urlServer}/${nameService}`);
   get = (id: number, nameService: string): Observable<any> => this.http.get<any>(`${this.urlServer}/${nameService}/${id}`);
   post = (item: any, nameService: string): Observable<any> => this.http.post<any>(`${this.urlServer}/${nameService}`, item);
   add = (item: any, nameService: string): Observable<any> => this.http.post<any>(`${this.urlServer}/${nameService}`, item);
   update = (item: any, nameService: string): Observable<any> => this.http.put<any>(`${this.urlServer}/${nameService}`, item);
   remove = (id: any, nameService: string): Observable<any> => this.http.delete<any>(`${this.urlServer}/${nameService}/${id}`);

   dispachData = (data: any) => this.subject.next(data);
}
