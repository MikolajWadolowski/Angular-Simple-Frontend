import { TitleCasePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { genreList } from '../genresList';

@Component({
  selector: 'app-book-rent',
  templateUrl: './book-rent.component.html',
  styleUrls: ['./book-rent.component.scss']
})
export class BookRentComponent implements OnInit {
  rentForm !: FormGroup;
  actionBtn : string = "Borrow"
  formGenres = new FormControl();
  genresList = genreList;
  userList:any;
  displayedColumns: string[] = ['username', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() bookId!: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    private api : ApiService,
    private dialogRef : MatDialogRef<BookRentComponent>
    
  ) { }

  ngOnInit(): void {
    this.usersDetails();
  }



  usersDetails(){
    this.api.getUsers().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 
      error:(err)=>{
        alert("Error while fetching Users")
      }
    })
  }

  bookRent(bookId:number,userId:number){    
     this.api.rentBook(bookId,userId).subscribe({
      next:(res)=>{
        alert("Book rented successfully")
        this.dialogRef.close();
      },
      error:()=>{
        alert("Error while renting the book")
      }

     })
  } 



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





}
