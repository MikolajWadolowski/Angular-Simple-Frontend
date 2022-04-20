import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookRentComponent } from './book-rent/book-rent.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'details/:id', component: BookDetailsComponent},
{path: 'users/:id', component: BookRentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
