import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id: number;
  data: Student;
  studentForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    age: ['', Validators.required],
    address: ['', Validators.required]

  });
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.data = new Student();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
      this.studentForm.patchValue(this.data);
    })
  }

  update() {
    //Update item by taking id and updated data object
    const student = this.studentForm.value;

    this.apiService.updateItem(this.id, student).subscribe(
      response => {
        this.studentForm.reset();
        this.apiService.editClient$.next(response);
      this.router.navigate(['list']);
    })
  }

}