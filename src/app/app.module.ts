import { MyFilesComponent } from './component/my-files/my-files.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { ViewFileComponent } from './components/view-file/view-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full'},
  {path:'view',component:ViewFileComponent},
  {path:'my-files',component:MyFilesComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
