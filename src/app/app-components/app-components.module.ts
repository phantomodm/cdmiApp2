import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../flat-modules/material.module';
import { FileUploadComponent } from './file-upload/file-upload.component';



@NgModule({
  declarations: [

  
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule

  ],
  exports: []
})
export class AppComponentsModule { }
