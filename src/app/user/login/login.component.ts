import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";

import { Compiler } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private _compiler: Compiler,private service:UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home/dashboard');
    }
  }

  onSubmit(form:NgForm){

    this.service.login(form.value).subscribe(

      (res:any)=>{

        let tokenInfo = this.getDecodedAccessToken(res.token); 
  
        localStorage.setItem('role',tokenInfo.role);
        localStorage.setItem('token',res.token);
        localStorage.setItem('userFullName',tokenInfo.UserFullName);
        localStorage.setItem('UserID',tokenInfo.UserID);
        localStorage.setItem('UserRoles',tokenInfo.UserRoles);
        this._compiler.clearCache();

        this.router.navigateByUrl('/user/login', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/home/dashboard']);
          
      });

      },
      err => {
        
        if(err.status==400){
          console.log(err);
          console.log(err.error);
          this.toastr.error('Login failed!',err.error.message)
        }else{
          this.toastr.error(err.message)
          console.log(err);
        }
        
      }


    );
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
