import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CoursVideo } from 'src/app/models/CoursVideo';
import { CourseService } from 'src/app/services/course.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-add-video-course',
  templateUrl: './add-video-course.component.html',
  styleUrls: ['./add-video-course.component.scss'],
})
export class AddVideoCourseComponent  implements OnInit {
  public course:CoursVideo
  public isFormReady=false
  public parent:any
  public inputFocused:{[key:string]:boolean} = {

  }
  constructor(public modalController:ModalController,public fb:FormBuilder,public toast:ToastController,public courseService:CourseService) { 
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.addVideoCourseForm = this.fb.group(this.inputs)
   }
   
  public addVideoCourseForm:FormGroup
   public inputs = {
    
   }
   public updateCourse(){
    let course={}
    
    Object.keys(this.addVideoCourseForm.controls).
       filter(k=>this.addVideoCourseForm.controls[k].value!='').forEach(k=>{
          //@ts-ignore
        course[k] = this.addVideoCourseForm.controls[k].value

    })
    //@ts-ignore
    console.log(course)
    
    return this.courseService.updateVideoCourse(this.course.id,course)
  }
  
  public backToCourses(){
    this.modalController.dismiss(null,'dropdown')

  }
  public selectVideo(){

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
  public addCourse(){
    let course={}
    Object.keys(this.addVideoCourseForm.controls).
       filter(k=>this.addVideoCourseForm.controls[k].value!='').forEach(k=>{
          //@ts-ignore
        course[k] = this.addVideoCourseForm.controls[k].value

    })
    //@ts-ignore
    course['parent'] =parseInt(this.parent) 
    
    return this.courseService.createVideoCourse(course)
  }
 
  ngOnInit() {

    this.initForm()
  }
  public initForm(){
    if(this.course){
      this.inputs = {
        name:[this.course.name,Validators.required],
        description:[this.course.description?this.course.description:'',Validators.required],
        url:[this.course.url,Validators.required]
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
        url:['',Validators.required]
        
       }
       Object.keys(this.inputs).forEach(k=>{
        this.inputFocused[k] = false
      })

    }
    this.addVideoCourseForm = this.fb.group(this.inputs)
     this.isFormReady=true 
  }

}
