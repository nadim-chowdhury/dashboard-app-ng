import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { CommonService } from 'src/app/shared/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  @Input() my_modal_title: string; // Add explicit type annotation
  EmployeeInfo: any; // Change to 'any' if EmployeeInfo type is unknown

  errorText: string; // Add explicit type annotation
  @Input() id: string; // Add explicit type annotation
  RoleList: any[] = []; // Change to 'any[]' if RoleList type is unknown

  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings;

  ShowFilter = false;
  limitSelection = false;
  cities: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public service: UserService,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'normalizedName',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  getEmployeeId() {
    // Get Employee Info
    const userName = this.service.formModel.controls['UserName'].value;
    if (userName) {
      this.commonService.getEmpInfo(userName).subscribe(
        (res: any) => {
          if (res.isSuccessfull) {
            this.EmployeeInfo = res.data;
            this.service.formModel.controls['FullName'].setValue(res.data.name);
            this.service.formModel.controls['Branch'].setValue(
              res.data.branchAndDivision
            );
            this.errorText = ''; // Assign an empty string instead of null
          } else {
            this.EmployeeInfo = null;
            this.service.formModel.controls['UserName'].setValue('');
            this.errorText = 'Invalid Employee Id !!!';
          }
        },
        (err) => {
          this.EmployeeInfo = null;
          this.service.formModel.controls['UserName'].setValue('');
          this.errorText = 'Invalid Employee Id !!!';
          console.log(err);
        }
      );
    } else {
      this.errorText = ''; // Handle the case when userName is null or empty
    }
  }

  onSubmit() {
    if (this.service) {
      this.service.saveUser().subscribe(
        (res: any) => {
          if (res.isSuccessfull) {
            this.toastr.warning('Data saved!', res.message);
          } else {
            this.toastr.error('Ops! Something went wrong!', res.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('Service is not defined!'); // Handle the case when service is not defined
    }
  }

  getRoles() {
    this.service.getRoles().subscribe(
      (res: any) => {
        this.RoleList = res.data;
        if (this.id) {
          this.getData(this.id, res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getData(id, roleList) {
    if (!this.service || !this.service.formModel) {
      console.log('Service or formModel is not defined!'); // Handle the case when service or formModel is not defined
      return;
    }

    this.service.getData(id).subscribe(
      (res: any) => {
        const obj = res.data;

        this.service.formModel.controls['Id'].setValue(obj.id);
        this.service.formModel.controls['UserName'].setValue(obj.userName);
        this.service.formModel.controls['Email'].setValue(obj.email);
        this.service.formModel.controls['Branch'].setValue(obj.branch);
        this.service.formModel.controls['FullName'].setValue(obj.fullName);
        this.service.formModel.controls['Role'].setValue(obj.normalizedName);

        const passwords = this.service.formModel.get('Passwords');
        if (passwords) {
          passwords.get('Password').setValue('00000');
          passwords.get('ConfirmPassword').setValue('00000');
        }

        var dbRoles = [];
        if (obj.roles) {
          obj.roles.forEach((element) => {
            if (
              roleList.filter((m) => m.normalizedName == element).length > 0
            ) {
              dbRoles.push(
                roleList.filter((m) => m.normalizedName == element)[0]
              );
            }
          });
          this.service.formModel.controls['selectedRoles'].setValue(dbRoles);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onItemSelect(item: any) {
    debugger;
    //this.service.formModel.value.selectedRoles.push(item);
    //this.service.userSelectedRoles.push(item);
    //  this.service.formModel.controls['selectedRoles'].setValue(
    //    this.service.formModel.value.selectedRoles.push(item));
  }
  onSelectAll(items: any) {
    // items.forEach(element => {
    //   //this.service.userSelectedRoles.push(element);
    //   this.service.formModel.controls['selectedRoles'].setValue(element);
    // });
  }

  //   onDeSelect(item: any) {
  //     var result =  this.service.formModel.value.selectedRoles
  //     var filtered = result.filter(m => m.normalizedName !== item.normalizedName);
  //     this.service.formModel.controls['selectedRoles'].setValue(filtered);

  // }
  // onDeSelectAll() {

  //   //this.service.userSelectedRoles =[];
  //   this.service.formModel.controls['selectedRoles'].setValue([]);

  // }
}
