import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER } from '@angular/material/datepicker';
import { delay } from 'rxjs';
import { RentDto } from './dtos/rent-book-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = "http://localhost:8080";
  
  
  public getBook(id:number){
    const url = this.apiurl + `/books/`+id;
    return this.http.get<any>(url).pipe(delay(1000));
  }

  public postBook(data : any){
    const url = this.apiurl + `/books/`;
    return this.http.post<any>(url,data).pipe(delay(1000));
  }

  public getBooks(){
    const url = this.apiurl + `/books/`;
    return this.http.get<any>(url).pipe(delay(1000));
  }

  public updateBook(data : any,id:number){
    const url = this.apiurl + `/books/`+id;
    console.log(data)
    return this.http.put<any>(url,data).pipe(delay(1000));
  }

  public deleteBook(id:number){
    const url = this.apiurl + `/books/`+id;
    return this.http.delete<any>(url).pipe(delay(1000));
  }

  public rentBook(bookId:number,userId:number){
    const url = this.apiurl + `/books/rent/`+ bookId + '/' + userId
    return this.http.post<any>(url,null).pipe(delay(1000));
  }

  public returnBook(bookId:number){
    const url = this.apiurl + `/books/return/`+ bookId;
    return this.http.post<any>(url,null).pipe(delay(1000));
  }

  public getUsers(){
    const url = this.apiurl + `/users/`;
    return this.http.get<any>(url).pipe(delay(1000));
  }

}
