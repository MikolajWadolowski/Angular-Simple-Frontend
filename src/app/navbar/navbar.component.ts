import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog , api : ApiService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
        width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){

      }
    })
  }
 
 editBook(row : any){
   this.dialog.open(DialogComponent,{
     width: '30%',
     data: row
   }).afterClosed().subscribe(val=>{
     if(val === "update"){

     }
   })
 }


  
}
