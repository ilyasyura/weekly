import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student2 } from '../student2.model';
import { Students3Service } from '../students3.service';

@Component({
  selector: 'app-students3',
  templateUrl: './students3.page.html',
  styleUrls: ['./students3.page.scss'],
})
export class Students3Page implements OnInit {

  students: Student2[];
  private studentSub: Subscription;
  constructor(
    private students3Srv: Students3Service
  ) { }

  ngOnInit() {
    this.studentSub = this.students3Srv.getAllStudents3().subscribe(students => {
      this.students = students;
    });
  }

  ngOnDestroy(){
    if (this.studentSub) {
      this.studentSub.unsubscribe();
    }
  }

}
