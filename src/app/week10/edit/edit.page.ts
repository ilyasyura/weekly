import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MahasiswaService } from '../mahasiswa.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  mahasiswa: any;
  key: string;

  @ViewChild('f', null) f: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mahasiswaService: MahasiswaService,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      if(!paramMap.has('key')) {return;}
      const key = paramMap.get('key');
      this.key = key;

      this.db.object('/mahasiswa/' + key).valueChanges().subscribe(data => {
        console.log('data: ', data);
        this.mahasiswa = data;
        console.log('this.mahasiswa: ', this.mahasiswa);
      });
    });

    setTimeout(() => {
      this.f.setValue(this.mahasiswa);
    });
  }

  onSubmit(form: NgForm){
    console.log(form);

    this.mahasiswaService.update(this.key, form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('/week10/index');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/week10/index');
  }

}
