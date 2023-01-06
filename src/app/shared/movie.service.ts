import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // Base url
  baseurl = 'https://f1-back-git-gi6ab3vb3q-ew.a.run.app';

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  // POST
  CreateMovie(data: any): Observable<Movie> {
    return this.http
      .post<Movie>(
        this.baseurl + '/movies/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  GetMovie(id: string | null): Observable<Movie> {
    return this.http
      .get<Movie>(this.baseurl + '/movies/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  GetMovies(): Observable<Movie> {
    return this.http
      .get<Movie>(this.baseurl + '/movies/')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  UpdateMovie(id: string | null, data: any): Observable<Movie> {
    return this.http
      .put<Movie>(
        this.baseurl + '/movies/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  DeleteMovie(id: string) {
    return this.http
      .delete<Movie>(this.baseurl + '/movies/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
