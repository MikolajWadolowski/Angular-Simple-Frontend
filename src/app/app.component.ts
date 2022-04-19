import { Component, OnInit,ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog'; 
import { ApiService } from './api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookDetailsComponent } from './book-details/book-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'frontedu';
 


  constructor(){


  }




}


