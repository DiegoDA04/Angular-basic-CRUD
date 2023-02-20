import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsTableComponent } from './learning/students/feature/students-table/students-table.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StudentsService} from "./learning/students/data-access/services/students.service";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StudentsTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
