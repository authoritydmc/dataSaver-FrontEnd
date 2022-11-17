import { Component, OnInit } from '@angular/core';
import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'datasaver-frontEnd';

  service_status:string='Not connected to API -Backend error <br> Change Backend IP address in upload Service BaseURL to fix ';
constructor(private uservice:UploadService){

}
  ngOnInit(): void {
    console.log("pinging!!!")
    
    let res=this.uservice.ping().subscribe(data=>{
      console.log(data)

      this.service_status=data.message;
    });
  }


}
