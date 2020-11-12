import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MahasiswaService } from '../mahasiswa.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {

  res: any=[];
  data: Observable<any>;

  constructor(
    private mhsService: MahasiswaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);

    const mhs = {
      nim: form.value.nim,
      nama: form.value.nama,
      prodi: form.value.prodi,
    };

    this.mhsService.insertMhs(mhs).subscribe(res => {
      console.log(res);
    });

    this.router.navigateByUrl('/week9/index');
  }

}
