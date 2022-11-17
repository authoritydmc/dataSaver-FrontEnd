import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import result from 'postcss/lib/result';
import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { UploadService } from 'src/app/service/upload.service';
import {Validation} from '../../utils/validation';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uservice:UploadService) { }
  fileValid=false;
  ngOnInit(): void {

    // this.form = this.formBuilder.group(
    //   {
    //     user_file: ['', Validators.required],
    //     upload_method:['',Validators.required]
    //   }
    // );
  }
  file:any;

 public form: FormGroup = new FormGroup({
    user_file: new FormControl(''),
    upload_method: new FormControl(''),

  });
  submitted = false;
  file_base64_val:string='';


  onUpload(){
    console.log(this.form.value);

    console.log(this.form.controls['upload_method'].value);
    
    if(this.file==null)
    {
      alert("cant proceed select file first")
    }


    if (this.form.controls['upload_method'].value=='upload_method_2')
    {
      //upload using base64 method
      const observable=new Observable((subscriber:Subscriber<any>)=>{
        this.uservice.base64Upload(this.file,subscriber);
  
      });
       observable.subscribe(data => {

      console.log("Upload base64 response => "+data);
      console.log(data);
      data.subscribe((c: any)=>{
        console.log(c)
        let fileUrl= encodeURI(c.fullDownloadURL);

        this.uservice.fetchDownloaddata(fileUrl).subscribe(res =>{
          console.log("download url data ")
          console.log(res)})
      console.log("opening "+fileUrl);
      window.open(fileUrl, "_blank");
      })

      
    });
    }else
    {
      // upload using multipart method

      this.uservice.mutipart_upload(this.file).subscribe((c:any) =>{
          console.log(c);
          let fileUrl=encodeURI(c.fullDownloadURL);
this.uservice.fetchDownloaddata(fileUrl).subscribe(res =>{
          console.log("download url data ")
          console.log(res)})
      console.log("opening "+fileUrl);
      window.open(fileUrl, "_blank");
      });
      
    }
    // this.uservice.base64Upload(this.file).subscribe(data => {

    //   console.log("Upload base64 response => "+data);
    //   console.log(data);
      

    //   let fileUrl=this.uservice.BASE_URL+data.downloadURL;
    //   console.log("opening "+fileUrl);
    //   window.open(fileUrl, "_blank");
    // });

    

  }
  onChange(event:any) {
    this.file = event.target.files[0];
    this.fileValid=true;
}


}
