import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
 apiurl = "http://localhost:8080";

  constructor(private http:HttpClient) { }




  public getBookById(id:number){
    const url = this.apiurl + `/books/`;
    return this.http.get(url+id).pipe(delay(1000));
  }

  public deleteBook(id:number){
    const url = this.apiurl + `/books/`;
    return this.http.delete(url+id).pipe(delay(1000));
  }

  public getBooks(){
    const url = this.apiurl + `/books/`;
    return this.http.get(url).pipe(delay(1000));
  }

}
