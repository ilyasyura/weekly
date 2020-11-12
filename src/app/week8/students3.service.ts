import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Student2 } from './student2.model';

@Injectable({
  providedIn: 'root'
})
export class Students3Service {

  private students = new BehaviorSubject<Student2[]>([
    new Student2('001', 'John Thor', 'Informatila'),
    new Student2('002', 'John Wick', 'Sistem Informasi')
  ]);

  constructor() { }

  getAllStudents3(){
    return this.students.asObservable();
  }

  getStudent(nim: string){
    return this.students.pipe(
      take(1),
      map(students => {
        return {...students.find(s => s.nim === nim)};
      })
    );
  }

  addStudent(student: Student2){
    this.getAllStudents3().pipe(take(1)).subscribe(students => {
      this.students.next(students.concat(student));
    })
  }
}
