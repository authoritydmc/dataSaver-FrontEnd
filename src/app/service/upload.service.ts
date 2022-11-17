import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject, Subscriber, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FileData } from '../utils/fileInterface';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  BASE_URL:string='http://192.168.1.69:8080/';
  constructor(private http: HttpClient) { }

  file: any;
  file_encoded_base64:string='';
  setFile(file: any) {
    this.file = file;
  }

  base64Upload(file:any,mainSubscriber:any){


    const observable=new Observable((subscriber:Subscriber<any>)=>{
      this.convertFile(file,subscriber);

    })

    observable.subscribe(base64=>{
      console.log("cnvrted base64 "+base64)
      this.file_encoded_base64=base64.split(",")[1];

      let fileU=new FileData(file.name,file.type,this.file_encoded_base64,'-1');

      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(fileU);
      console.log(body)
      // return this.http.post(this.BASE_URL + 'file', body,{'headers':headers});
        mainSubscriber.next(this.http.post(this.BASE_URL + 'file', body,{'headers':headers}));
        mainSubscriber.complete();
    })
  }

  mutipart_upload(file:any) {
   let headers= new HttpHeaders({
     
    });
    const formData = new FormData();
    formData.append("file",file);
    formData.append("userID","-2");
  return  this.http.post(this.BASE_URL + 'file/upload', formData,{})

  }

  ping()
  {
return this.http.get<any>(this.BASE_URL);
  }

  convertFile(file : File,subsriber:Subscriber<any>) {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      subsriber.next(reader.result);
      subsriber.complete();
    }
    reader.onerror=()=>{
      subsriber.error();
      subsriber.complete();

    }
    
  }


  fetchDownloaddata(url:string)
  {
    return this.http.get<any>(url);
  }
 


}




// // {
//   "name": "Raj Dubey.png",
//   "type": "image/png",
//   "data": "12333",
//   "userID": "11"
// }
// base 64 file payload  POST method ... 


// for MultiPart 
// POST form data required :: 
// 1. file : input file
// 2. userID : user ID of user ..