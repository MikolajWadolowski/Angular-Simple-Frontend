import { Component, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { BookRentComponent } from '../book-rent/book-rent.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookId!: number;
  book: any;
  rentForm !: FormGroup;
  constructor(private api: ApiService,private route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.bookId = id;
   this.bookDetails(id);
  }



  returnBook(bookId: number){
    this.api.returnBook(bookId).subscribe({
      next:(res)=>{
        alert("Book returned successfully")
        this.bookDetails(bookId);
      },
      error:()=>{
        alert("Failed at returing the book")
      }
    })

  }


  openDialog(bookId: number) {
    console.log(bookId);
    this.dialog.open(BookRentComponent, {
        width: '30%',
        data: bookId
    }).afterClosed().subscribe(val=>{
      this.bookDetails(bookId);
    })
  }

  bookDetails(id: number){
    let resp = this.api.getBook(id);
    resp.subscribe(data=>this.book=data);
  }

}
