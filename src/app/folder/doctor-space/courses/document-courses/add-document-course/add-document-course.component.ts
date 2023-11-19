import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';


@Component({
  selector: 'app-add-document-course',
  templateUrl: './add-document-course.component.html',
  styleUrls: ['./add-document-course.component.scss'],
})
export class AddDocumentCourseComponent  implements OnInit {
  public photo = ''
  
  //just use openFileChooser https://ionicframework.com/docs/v5/native/chooser
  public inputFocused:{[key:string]:boolean} = {

  }
  constructor(public modalController:ModalController,public fb:FormBuilder,public chooser:Chooser ) { 
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.addDocumentCourseForm = this.fb.group(this.inputs)
   }
   
  public addDocumentCourseForm:FormGroup
   public inputs = {
    name:['',Validators.required],
    description:['',Validators.required],
    
   }

  public backToCourses(){
    this.modalController.dismiss(null,'dropdown')

  }

  public submitForm(){
    
  }
  public selectDocument(){
    this.chooser.getFile()
    .then(file => console.log(file ? file.name : 'canceled'))
    .catch((error: any) => console.error(error));
    
  
  }
  ngOnInit() {
    
  }

}
