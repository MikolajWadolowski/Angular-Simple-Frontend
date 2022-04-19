import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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

  actionBtn : string = "Borrow"
  formGenres = new FormControl();
  genresList = genreList;
  userList:any;
  displayedColumns: string[] = ['username', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    private api : ApiService,
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





}
