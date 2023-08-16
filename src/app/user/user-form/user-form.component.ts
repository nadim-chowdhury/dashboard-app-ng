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
  @Input() my_modal_title: string = '';
  EmployeeInfo: any = null;

  errorText: string = '';
  @Input() id: string = '';
  RoleList: any[] = [];

  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'normalizedName',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  ShowFilter = false;
  limitSelection = false;
  cities: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    // private roleService: RoleService,
    public service: UserService,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    // this.getRoles();
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
    const userName = this.service.formModel.controls['UserName'].value;
    if (userName) {
      // this.commonService.getEmpInfo(userName).subscribe(
      //   (res: any) => {
      //     if (res.isSuccessfull) {
      //       this.EmployeeInfo = res.data;
      //       this.service.formModel.controls['FullName'].setValue(res.data.name);
      //       this.service.formModel.controls['Branch'].setValue(
      //         res.data.branchAndDivision
      //       );
      //       this.errorText = '';
      //     } else {
      //       this.EmployeeInfo = null;
      //       this.service.formModel.controls['UserName'].setValue('');
      //       this.errorText = 'Invalid Employee Id !!!';
      //     }
      //   },
      //   (err: string) => {
      //     this.EmployeeInfo = null;
      //     this.service.formModel.controls['UserName'].setValue('');
      //     this.errorText = 'Invalid Employee Id !!!';
      //     console.log(err);
      //   }
      // );
    } else {
      this.errorText = '';
    }
  }

  onSubmit() {
    // if (this.service) {
    //   this.service.saveUser()?.subscribe(
    //     (res: any) => {
    //       if (res?.isSuccessfull) {
    //         this.toastr.warning('Data saved!', res.message);
    //       } else {
    //         this.toastr.error('Ops! Something went wrong!', res.message);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // } else {
    //   console.log('Service is not defined!');
    // }
  }

  // getRoles() {
  //   this.service.getRoles().subscribe(
  //     (res: any) => {
  //       this.RoleList = res.data;
  //       if (this.id) {
  //         this.getData(this.id, res.data);
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getData(id: string, roleList: any[]) {
    if (!this.service || !this.service.formModel) {
      console.log('Service or formModel is not defined!');
      return;
    }

    // this.service.getData(id).subscribe(
    //   (res: any) => {
    //     const obj = res.data;

    //     this.service.formModel.controls['Id'].setValue(obj.id);
    //     this.service.formModel.controls['UserName'].setValue(obj.userName);
    //     this.service.formModel.controls['Email'].setValue(obj.email);
    //     this.service.formModel.controls['Branch'].setValue(obj.branch);
    //     this.service.formModel.controls['FullName'].setValue(obj.fullName);
    //     this.service.formModel.controls['Role'].setValue(obj.normalizedName);

    //     const passwords = this.service.formModel.get('Passwords');
    //     if (passwords) {
    //       // passwords.get('Password').setValue('00000');
    //       // passwords.get('ConfirmPassword').setValue('00000');
    //     }

    //     const dbRoles: any[] = [];
    //     if (obj.roles) {
    //       obj.roles.forEach((element: string) => {
    //         const matchingRoles = roleList.filter(
    //           (m) => m.normalizedName === element
    //         );
    //         if (matchingRoles.length > 0) {
    //           dbRoles.push(matchingRoles[0]);
    //         }
    //       });
    //       // this.service.formModel.controls['selectedRoles'].setValue(dbRoles);
    //     }
    //   },
    //   (err: string) => {
    //     console.log(err);
    //   }
    // );
  }

  onItemSelect(item: any) {
    if (!this.service) {
      console.log('Service is not defined!');
      return;
    }

    if (!this.service.formModel) {
      console.log('Form model is not defined!');
      return;
    }

    // this.service.formModel.value.selectedRoles.push(item);

    // if (this.service.userSelectedRoles) {
    //   this.service.userSelectedRoles.push(item);
    // }

    //   this.service.formModel.controls['selectedRoles'].setValue(
    //     this.service.formModel.value.selectedRoles
    //   );
    // }

    // onSelectAll(items: any[]) {
    //   if (!this.service) {
    //     console.log('Service is not defined!');
    //     return;
    //   }

    const selectedRoles = this.service.formModel.controls['selectedRoles'];
    if (!selectedRoles) {
      console.log('Selected roles control is not defined!');
      return;
    }

    // items.forEach((element: any) => {
    //   selectedRoles.setValue(element);
    // });
  }

  onDeSelect(item: any) {
    if (!this.service) {
      console.log('Service is not defined!');
      return;
    }

    const selectedRoles = this.service.formModel.get('selectedRoles');
    if (!selectedRoles || !Array.isArray(selectedRoles.value)) {
      console.log('Selected roles control is not defined or not valid!');
      return;
    }

    const result: any[] = selectedRoles.value;

    const filtered = result.filter(
      (m: any) => m.normalizedName !== item.normalizedName
    );

    // selectedRoles.setValue(filtered);
  }

  onDeSelectAll() {
    if (!this.service) {
      console.log('Service is not defined!');
      return;
    }

    // this.service.formModel.controls['selectedRoles'].setValue([]);
  }
}
