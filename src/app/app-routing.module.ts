import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsTableComponent} from "./learning/students/feature/students-table/students-table.component";

const routes: Routes = [
  {
    path: 'students',
    component: StudentsTableComponent
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
