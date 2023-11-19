import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Handler } from 'leaflet';
import { Course } from 'src/app/models/Course';
import { Field } from 'src/app/models/Field';
import { ConfigService } from 'src/app/services/config.service';
import { CourseService } from 'src/app/services/course.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  public expanded = false
  public course:Course
  public isFormReady:boolean=false
  public fields :Field[]=[]
  public inputFocused:{[key:string]:boolean} = {

  }
  constructor(public modalController:ModalController,public fb:FormBuilder,public toast:ToastController,public configService:ConfigService,public courseService:CourseService) { 
     

 //   this.addCourseForm = this.fb.group(this.inputs)
   }
   
  public addCourseForm:FormGroup
   public inputs = {}

  public backToCourses(){
    this.modalController.dismiss(null,'dropdown')

  }
  public expandFieldsSection(){
  //  console.log('wooow')
    this.expanded?this.expanded=false:this.expanded=true
  }
  public addCourse(){
    let course={}
    Object.keys(this.addCourseForm.controls).
       filter(k=>this.addCourseForm.controls[k].value!='').forEach(k=>{
          //@ts-ignore
        course[k] = this.addCourseForm.controls[k].value

    })
    //@ts-ignore
    if(course.field_id){
      //@ts-ignore
      course.field_id = parseInt(course.field_id)
    }
    return this.courseService.addCourse(course)
  }
  public updateCourse(){
    let course={}

    Object.keys(this.addCourseForm.controls).
       filter(k=>this.addCourseForm.controls[k].value!='').forEach(k=>{
          //@ts-ignore
        course[k] = this.addCourseForm.controls[k].value

    })
    //@ts-ignore
    if(course.field_id){
      //@ts-ignore
      course.field_id = parseInt(course.field_id)
    }
    return this.courseService.updateCourse(this.course.id,course)
  }
  
  public submitForm(){
      if(this.course){
        
        this.updateCourse().subscribe(data=>{
          SuccessHandlor(this.toast,data.message)
          this.modalController.dismiss(data,'dropdown')
          
        },err=>{
          HandlerError(this.toast,err)

        })
      }
      else{
        this.addCourse().subscribe(data=>{
          SuccessHandlor(this.toast,data.message)
          this.modalController.dismiss(data,'dropdown')
        },err=>{
          HandlerError(this.toast,err)
        })
      }
  }
  public initForm(){
    if(this.course){
      this.inputs = {
        name:[this.course.name,Validators.required],
        description:[this.course.description?this.course.description:'',Validators.required],
        field_id:[this.course.field_id,Validators.required]
       }
       Object.keys(this.inputs).filter(k=>k!='field_id').forEach(k=>{
        //@ts-ignore
        this.inputFocused[k] = this.inputs[k][0]!=''
      })  

    }
    else{
      this.inputs = {
        name:['',Validators.required],
        description:['',Validators.required],
        field_id:['',Validators.required]
        
       }
       Object.keys(this.inputs).forEach(k=>{
        this.inputFocused[k] = false
      })

    }
    this.addCourseForm = this.fb.group(this.inputs)
     this.isFormReady=true 
  }
  ionViewDidEnter() {
    this.configService.getFieldsForCourses().subscribe(data=>{
      this.fields = data.data
      this.initForm()
    })
    //initializing the selected fields this will be updated in the update course componenet
  





  }
 

}
