import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase/firebase.service'

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(private fb:FormBuilder,private router:Router,  private FirebaseService : FirebaseService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  ngOnInit(): void {
    this.FirebaseService.initFirebase()
    //throw new Error('Method not implemented.');
  }
  public onSubmit():void {
    

  }
  onClickSubmit(values:{email:string,password:string}){
    console.log(values)
    this.submitted = true;
    this.FirebaseService.signIn(values.email,values.password)
  }

}
 