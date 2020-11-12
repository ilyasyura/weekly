import { Component, OnInit } from '@angular/core';
import { MahasiswaService } from '../mahasiswa.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  students: any;
  constructor(
    private mhsService: MahasiswaService
  ) { }

  ngOnInit() {
    this.mhsService.getAllStudents().subscribe((res) => {
      this.students = res;
      console.log(res);
    });
  }

  ionViewWillEnter(){
    this.mhsService.getAllStudents().subscribe((res) => {
      this.students = res;
      console.log(res);
    });
  }

  delete(event, nim){
    console.log(nim);
    this.mhsService.deleteMhs(nim).subscribe(res => {
      console.log(res);
    });
    this.ionViewWillEnter();
  }

}
