import { Component, OnInit } from '@angular/core';
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

  book: any;
  rentForm !: FormGroup;

  constructor(private api: ApiService,private route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
   this.bookDetails(Number(id));
  }


  openDialog() {
    this.dialog.open(BookRentComponent, {
        width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){

      }
    })
  }

  bookDetails(id: number){
    let resp = this.api.getBook(id);
    resp.subscribe(data=>this.book=data);
  }

}
