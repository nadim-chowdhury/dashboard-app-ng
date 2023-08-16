import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
// import { FormData } from '@angular/common/http';
// Use your own locale

@Injectable({
  providedIn: 'root',
})
export class CardapplicationService {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  readonly BaseURI = this.config.apiEndpoint + 'CardApplicationData';

  formModel = this.fb.group({
    Id: [''],
    SourceChannel: ['', [Validators.required, Validators.maxLength(30)]],
    SourcedBy: ['', [Validators.required, Validators.maxLength(30)]],
    CompanyId: ['', [Validators.required, Validators.maxLength(200)]],
    CompanyName: ['', [Validators.required, Validators.maxLength(300)]],
    ReferenceName: ['', [Validators.required, Validators.maxLength(30)]],
    FileNo: [''],
    FromDate: ['', [CommonService.dateVaidator]],
    ToDate: ['', [CommonService.dateVaidator]],
    ApplicationStages: [''],
  });
  formModelCreditData = this.fb.group({
    Id: ['', [Validators.required]],
    FileNo: ['', [Validators.required, Validators.maxLength(7)]],
    FullName: ['', [Validators.required, Validators.maxLength(30)]],
    IncomeDetails_BusinessIncome: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    IncomeDetails_NetBusinessIncome: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    IncomeDetails_OtherIncome: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    IncomeDetails_NetIncome: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    IncomeDetails_FamilyExpense: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    IncomeDetails_SurplusIncome: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    CIB_Dated: [
      '',
      [
        Validators.required,
        CommonService.dateVaidator,
        Validators.maxLength(10),
      ],
    ],
    CIB_Status: ['', [Validators.required, Validators.maxLength(10)]],
    DBR_ExistingEMI: [null, [Validators.required, Validators.maxLength(18)]],
    DBR_ProposedEMI: [null, [Validators.required, Validators.maxLength(18)]],
    DBR_TotalEMI: [null, [Validators.required, Validators.maxLength(18)]],
    DBR_DBRatio: [null, [Validators.required, Validators.maxLength(18)]],
    EligibilityScore_MonthlyScore: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    EligibilityScore_PointsObtained: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    EligibilityScore_Multiplier: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    LimitInfo_AppliedAmount: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    LimitInfo_SalesBranchRequest: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    LimitInfo_MaxLimitAsPerMultiplier: [
      null,
      [Validators.required, Validators.maxLength(18)],
    ],
    CardType: ['', [Validators.required, Validators.maxLength(50)]],
    Limit: [null, [Validators.required, Validators.maxLength(18)]],
    HaveSupplementaryCard: [
      '',
      [Validators.required, Validators.maxLength(10)],
    ],
    SupplementaryCard_Name: [
      '',
      [Validators.required, Validators.maxLength(30)],
    ],
    SupplementaryCard_Relationship: [
      '',
      [Validators.required, Validators.maxLength(10)],
    ],
    SupplementaryCard_Portion: [
      '',
      [Validators.required, Validators.maxLength(10)],
    ],
    Observation: ['', [Validators.required, Validators.maxLength(500)]],
    SpecialCondition: ['', [Validators.required, Validators.maxLength(500)]],
    Security: ['', [Validators.required, Validators.maxLength(500)]],
    Exception: ['', [Validators.required, Validators.maxLength(500)]],
    ApprovalAuthority: ['', [Validators.required, Validators.maxLength(500)]],
  });
  formModelInvestmentDetails = this.fb.group({
    CardApplicationDataId: ['', [Validators.required]],
    BankName: ['', [Validators.required]],
    FacilityType: ['', [Validators.required]],
    OutstandingAmount: [0, [Validators.required]],
    EMI: ['', [Validators.required]],
    Status: ['', [Validators.required]],
  });

  formModelContactPointVerification = this.fb.group({
    CardApplicationDataId: ['', [Validators.required]],
    Particulars: ['', [Validators.required]],
    Conducted: ['', [Validators.required]],
    IsSatisfactory: [null, [Validators.required]],
    CPV_Done_BY: [null, [Validators.required]],
  });
  deliverdModel = this.fb.group({
    cardDataId: [''],
    statusName: [''],
    SourceChannel: ['', [Validators.required]],
    SourcedBy: ['', [Validators.required]],
  });

  save() {
    var body = {
      Id: this.formModel.value.Id,
      FileNo: this.formModel.value.FileNo,
      SourceChannel: this.formModel.value.SourceChannel,
      SourcedBy: this.formModel.value.SourcedBy,
      CompanyId: this.formModel.value.CompanyId,
      CompanyName: this.formModel.value.CompanyName,
      ReferenceName: this.formModel.value.ReferenceName,
    };
    if (this.formModel.value.Id != null) {
      return this.http.put(this.BaseURI, body);
    } else {
      return this.http.post(this.BaseURI, body);
    }
  }
  search(stageId: any) {
    const fromDate = this.formModel.controls['FromDate'].value;
    const toDate = this.formModel.controls['ToDate'].value;

    const formattedFromDate = this.formatDate(fromDate);
    const formattedToDate = this.formatDate(toDate);

    const body = {
      FileNo: this.formModel.value.FileNo,
      CompanyId: this.formModel.value.CompanyId,
      CompanyName: this.formModel.value.CompanyName,
      SourceChannel: this.formModel.value.SourceChannel,
      SourcedBy: this.formModel.value.SourcedBy,
      FromDate: formattedFromDate,
      ToDate: formattedToDate,
      ApplicationStageId: stageId,
    };

    return this.http.post(this.BaseURI + '/GetApplicationsWithStatusId', body);
  }

  formatDate(date: any): string {
    if (date) {
      const year = date.year;
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  delete(id: string) {
    return this.http.delete(this.BaseURI + '/' + id);
  }

  changeStage(id: string, nextSerial: string) {
    return this.http.get(
      `${this.BaseURI}/ChangeStage?id=${id}&nextSerial=${nextSerial}`
    );
  }

  uploadFile(formData: FormData) {
    return this.http.post(`${this.BaseURI}/FileUpload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  giveOtherStatus(
    id: string,
    statusName: string,
    sourceChannel: string,
    sourceBy: string
  ) {
    return this.http.get(
      `${this.BaseURI}/GiveOtherStatus?id=${id}&statusName=${statusName}&sourceChannel=${sourceChannel}&sourceBy=${sourceBy}`
    );
  }

  receiveDocument(historyId: string) {
    return this.http.get(
      `${this.BaseURI}/ReceiveDocument?historyId=${historyId}`
    );
  }

  getApplicationDetails(id: string) {
    return this.http.get(`${this.BaseURI}/${id}`);
  }

  getWithStage(id: string, historyId: string) {
    return this.http.get(
      `${this.BaseURI}/GetWithStage?id=${id}&historyId=${historyId}`
    );
  }

  getApplicationDetailsAndBind(id: string) {
    return this.http.get(`${this.BaseURI}/${id}`);
  }

  getDashboardVM() {
    return this.http.get(`${this.BaseURI}/GetDashboardVM`);
  }

  getApplicationsWithStatusId(statusId: string) {
    return this.http.get(
      `${this.BaseURI}/GetApplicationsWithStatusId?statusId=${statusId}`
    );
  }

  getAllWithStatusForSingleApp(appId: string) {
    return this.http.get(
      `${this.BaseURI}/GetAllWithStatusForSingleApp?appId=${appId}`
    );
  }

  saveInvestmentDetails(cardInfoId: string | number | null | undefined) {
    if (cardInfoId === null || cardInfoId === undefined) {
      return; // Or handle the case as needed
    }

    const cardId = cardInfoId.toString(); // Ensure cardInfoId is a string

    const body = {
      CardApplicationDataId: cardId,
      BankName: this.formModelInvestmentDetails.value.BankName,
      FacilityType: this.formModelInvestmentDetails.value.FacilityType,
      // OutstandingAmount: parseInt(
      //   this.formModelInvestmentDetails.value.OutstandingAmount,
      //   10
      // ),
      EMI: this.formModelInvestmentDetails.value.EMI,
      Status: this.formModelInvestmentDetails.value.Status,
    };

    return this.http.post(`${this.BaseURI}/SaveInvestmentDetails`, body);
  }

  getInvestmentDetails(id: string | number) {
    return this.http.get(`${this.BaseURI}/GetInvestmentDetails?id=${id}`);
  }

  // formModelContactPointVerification = this.fb.group({
  //   CardApplicationDataId: ['', [Validators.required]],
  //   Particulars: ['', [Validators.required]],
  //   Conducted: ['', [Validators.required]],
  //   IsSatisfactory: [null, [Validators.required]],
  //   CPV_Done_BY: [null, [Validators.required]]
  // });

  saveContactPointVerification(cardInfoId: string | number | null | undefined) {
    if (cardInfoId === null || cardInfoId === undefined) {
      return; // Or handle the case as needed
    }

    const body = {
      CardApplicationDataId: cardInfoId.toString(),
      Particulars: this.formModelContactPointVerification.value.Particulars,
      Conducted: this.formModelContactPointVerification.value.Conducted,
      IsSatisfactory:
        this.formModelContactPointVerification.value.IsSatisfactory,
      CPV_Done_BY: this.formModelContactPointVerification.value.CPV_Done_BY,
    };

    return this.http.post(`${this.BaseURI}/SaveContactPointVerification`, body);
  }

  saveCreditAnalystData() {
    const formValue = this.formModelCreditData.value;

    if (!formValue) {
      return; // Handle the case when the form value is null or undefined
    }

    const body = {
      Id: formValue.Id,
      IncomeDetails_BusinessIncome: formValue.IncomeDetails_BusinessIncome,
      IncomeDetails_NetBusinessIncome:
        formValue.IncomeDetails_NetBusinessIncome,
      IncomeDetails_OtherIncome: formValue.IncomeDetails_OtherIncome,
      IncomeDetails_NetIncome: formValue.IncomeDetails_NetIncome,
      IncomeDetails_FamilyExpense: formValue.IncomeDetails_FamilyExpense,
      IncomeDetails_SurplusIncome: formValue.IncomeDetails_SurplusIncome,
      CIB_Dated: formValue.CIB_Dated,
      CIB_Status: formValue.CIB_Status,
      DBR_ExistingEMI: formValue.DBR_ExistingEMI,
      DBR_ProposedEMI: formValue.DBR_ProposedEMI,
      DBR_TotalEMI: formValue.DBR_TotalEMI,
      DBR_DBRatio: formValue.DBR_DBRatio,
      EligibilityScore_MonthlyScore: formValue.EligibilityScore_MonthlyScore,
      EligibilityScore_PointsObtained:
        formValue.EligibilityScore_PointsObtained,
      EligibilityScore_Multiplier: formValue.EligibilityScore_Multiplier,
      LimitInfo_AppliedAmount: formValue.LimitInfo_AppliedAmount,
      LimitInfo_SalesBranchRequest: formValue.LimitInfo_SalesBranchRequest,
      LimitInfo_MaxLimitAsPerMultiplier:
        formValue.LimitInfo_MaxLimitAsPerMultiplier,
      CardType: formValue.CardType,
      Limit: formValue.Limit,
      HaveSupplementaryCard: formValue.HaveSupplementaryCard,
      SupplementaryCard_Name: formValue.SupplementaryCard_Name,
      SupplementaryCard_Relationship: formValue.SupplementaryCard_Relationship,
      SupplementaryCard_Portion: formValue.SupplementaryCard_Portion,
      Observation: formValue.Observation,
      SpecialCondition: formValue.SpecialCondition,
      Security: formValue.Security,
      Exception: formValue.Exception,
      ApprovalAuthority: formValue.ApprovalAuthority,
    };

    return this.http.post(this.BaseURI + '/SaveCreditAnalysData', body);
  }

  // Call the function somewhere in your code
  // For example:
  // this.saveCreditAnalystData().subscribe(response => {
  //   console.log('Data saved:', response);
  // }, error => {
  //   console.error('Error saving data:', error);
  // });

  getContactPointVerification(id: string | number) {
    return this.http.get(
      `${this.BaseURI}/GetContactPointVerification?id=${id}`
    );
  }

  getXML(id: string | number) {
    return this.http.get(`${this.BaseURI}/GetXml?id=${id}`);
  }

  getApplicationsQuery(appId: string | number) {
    return this.http.get(`${this.BaseURI}/GetApplicationQuery?appId=${appId}`);
  }

  addApplicationsQuery(appId: string | number, message: string) {
    return this.http.get(
      `${this.BaseURI}/AddApplicationQuery?appId=${appId}&message=${message}`
    );
  }

  toDate(dob: string, name: string) {
    if (dob) {
      const [year, month, day] = dob.split('-');
      const obj = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day.split(' ')[0].trim()),
      };
      this.formModel
        .get(name)
        ?.setValue(new Date(obj.year, obj.month - 1, obj.day));
    }
  }

  toDate_2(dob: string, name: string) {
    if (dob) {
      const [year, month, day] = dob.split('-');
      const obj = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day.split(' ')[0].trim()),
      };
      this.formModelCreditData
        .get(name)
        ?.setValue(new Date(obj.year, obj.month - 1, obj.day));
    }
  }
}
