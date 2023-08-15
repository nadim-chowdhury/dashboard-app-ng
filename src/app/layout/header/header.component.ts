import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  userDetails;
  userRole;
  userRoles;
  userName;
  constructor(private router:Router, public service:UserService,private _compiler: Compiler) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
 
   this.userName= localStorage.getItem('userFullName');
   this.userRoles= localStorage.getItem('UserRoles');

   this._compiler.clearCache();


  }
  onLogout(){
    
    localStorage.removeItem('token');

    this.router.navigate(['/user/login']);

  }


}
