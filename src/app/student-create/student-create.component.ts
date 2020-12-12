import { ApiService } from './../services/api.service';
import { Student } from './../models/student';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {


  data: Student

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Student();
  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });

  }

}
