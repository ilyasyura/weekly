import { Injectable } from '@angular/core';
import { Student2 } from './student2.model';

@Injectable({
  providedIn: 'root'
})
export class Students2Service {

  private students:Student2[] = [
    new Student2('001', 'John Thor', 'Informatika'),
    new Student2('002', 'John Wick', 'Sistem Informasi')
  ]
  constructor() { }

  getAllStudents(){
    return [...this.students];
  }

  getStudents(nim: string){
    return {...this.students.find(students => {
      return students.nim = nim;
    })};
  }

  addStudent(student: Student2){
    const x = this.students.push(student);
    console.log(x);
  }
}
