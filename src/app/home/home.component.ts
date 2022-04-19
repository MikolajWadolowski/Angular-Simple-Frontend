import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'frontedu';
  displayedColumns: string[] = ['title', 'author', 'isbn', 'pageNumber', 'dateOfRelease', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api : ApiService){


  }
  ngOnInit(): void {
    this.getAllBooks();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
        width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllBooks();
      }
    })
  }
 
 editBook(row : any){
   this.dialog.open(DialogComponent,{
     width: '30%',
     data: row
   }).afterClosed().subscribe(val=>{
     if(val === "update"){
       this.getAllBooks();
     }
   })
 }
  getAllBooks(){
    this.api.getBooks().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 
      error:(err)=>{
        alert("Error while fetching Books")
      }
    })
  }

  deleteBook(id:number){
    this.api.deleteBook(id)
    .subscribe({
      next:(res)=>{
        alert("Book Deleted")
        this.getAllBooks();
      },
      error:()=>{
        alert("Error book failed to Delete")
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