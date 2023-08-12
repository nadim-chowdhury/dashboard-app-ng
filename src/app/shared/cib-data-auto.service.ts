import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config.module';


@Injectable({
  providedIn: 'root'
})
export class CibDataAutoService {

  constructor(private fb:FormBuilder, private http:HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

    formModel = this.fb.group({
      Path:['',Validators.required],
      CibCode:['',Validators.required]
    });

    readonly BaseURI =this.config.apiEndpoint +'CibAuto';

  //  public baseurl 
getBaseUrl(){
  return this.config.fileEndpoint;
}
startprocess(data){
  return this.http.post(this.BaseURI+'/StartProcess',data);
}


    process(id)
      {
        
        return this.http.post(this.BaseURI+'?id='+id,null);
      }

      getProcessList(){

        return this.http.get(this.BaseURI+'/GetCibProcessInfoList');
      }
      deleteProcess(id){
        return this.http.get(this.BaseURI+'/DeleteProcess?id='+id);
      }
      getProcessReport(id){
        return this.http.get(this.BaseURI+'/GetCibReport?id='+id);
      }
      userCheckDetails(id){
        return this.http.get(this.BaseURI+'/UserCheckDetails?id='+id);
      } userCheckBreakup(id){
        return this.http.get(this.BaseURI+'/UserCheckBreakup?id='+id);
      }
  }
