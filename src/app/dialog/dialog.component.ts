import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { genreList } from '../genresList';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  bookForm !: FormGroup;
  actionBtn : string = "Save"
  // formGenres = new FormControl();
  genresList = genreList;
  

  
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>

  ) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
        title : ['',Validators.required],
        author : ['',Validators.required],
        isbn : ['',Validators.required],
        pageNumber : ['',Validators.required],
        dateOfRelease : ['',Validators.required],
        genres : this.formBuilder.array([''])
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.bookForm.controls['title'].setValue(this.editData.title);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['isbn'].setValue(this.editData.isbn);
      this.bookForm.controls['pageNumber'].setValue(this.editData.pageNumber);
      this.bookForm.controls['dateOfRelease'].setValue(this.editData.dateOfRelease);
      this.bookForm.controls['genres'].setValue(this.editData.genres);
    }
  }

  addBook(){
    console.log(this.bookForm.value);
    if(!this.editData){
      console.log(this.bookForm);
    if(this.bookForm.valid){
      this.api.postBook(this.bookForm.value)
      .subscribe({
        next:(res)=>{
          alert("Book added successfully")
          this.bookForm.reset();
          this.dialogRef.close('save');


        },
        error:()=>{
          alert("Error while adding the book")
        }
      })
    }
  }else {
    this.updateBook()
  }
  } 
  updateBook(){
    this.api.updateBook(this.bookForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Book Updated");
        this.bookForm.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("Error while updating the book")
      }
    })
  }



}
