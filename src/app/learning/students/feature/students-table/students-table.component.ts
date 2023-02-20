import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {StudentsService} from "../../data-access/services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {Student} from "../../data-access/models/student";
import {NgForm} from "@angular/forms";
import {update} from "lodash";

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {

  studentData: Student
  dataSource: MatTableDataSource<any>
  @ViewChild('studentForm') studentForm !: NgForm
  isEditMode = false;
  displayedColumns: string[] = ['id', 'name','age','address', 'actions']

  constructor(private studentService: StudentsService) {
    this.dataSource = new MatTableDataSource<any>();
    this.studentData = {} as Student;
  }

  ngOnInit(): void {
    this.getAllStudents()
  }
  getAllStudents() {
    this.studentService.getAll().subscribe((response:any) => this.dataSource.data = response)
  }
  deleteItem(id:number) {
    this.studentService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o:Student) => {
        return o.id !== id ? o : false;
      })
    })
  }
  addStudent() {
    this.studentData.id = 0
    this.studentService.create(this.studentData).subscribe((response:any) => {
      this.dataSource.data.push({...response})
      console.log(this.dataSource)
      this.dataSource.data = [...this.dataSource.data]
      console.log(this.dataSource)
    })
  }

  editItem(element:Student) {
    this.studentData = _.cloneDeep(element);
    console.log(this.studentForm)
    this.isEditMode = true
  }
  cancelEdit() {
    this.isEditMode = false;
    this.studentData.id = 0
    this.studentForm.resetForm();
  }

  updateStudent() {
    this.studentService.update(this.studentData.id, this.studentData).subscribe((response:any) => {
      this.dataSource.data = this.dataSource.data.map((o:any) => {
        if(o.id === response.id) o = response;
        return o;
      })
    })
  }
  onSubmit() {
    if(this.studentForm.valid) {
      if(this.isEditMode) {
        this.updateStudent();
      }else {
        this.addStudent();
      }
      this.cancelEdit()
    }
  }
}
