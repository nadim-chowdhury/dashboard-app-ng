import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  @Input() my_modal_title?: string;
  EmployeeInfo: any;

  errorText?: string;
  @Input() id?: number;
  RoleList: any[] = [];

  constructor(public service: UserService, private toastr: ToastrService) {}

  ngOnInit() {}

  onSubmit() {
    this.service.changePassword().subscribe(
      (res: any) => {
        if (res.isSuccessfull) {
          this.service.changePasswordModel.reset();
          this.toastr.warning('Data saved!', res.message);
        } else {
          this.toastr.error('Ops! Something went wrong!', res.message);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
