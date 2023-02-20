import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Student} from "../models/student";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  urlAPI = 'http://localhost:3000/api/v1/students'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/json',
    })
  }
  constructor(private http:HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getAll(): Observable<Student> {
    return this.http.get<Student>(this.urlAPI, this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  delete(id:any) {
    return this.http.delete<Student>(`${this.urlAPI}/${id}`,this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  create(item:any): Observable<Student> {
    return this.http.post<Student>(this.urlAPI,JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  update(id:any, item:any): Observable<Student> {
    return  this.http.put<Student>(`${this.urlAPI}/${id}`,JSON.stringify(item),this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }
}
