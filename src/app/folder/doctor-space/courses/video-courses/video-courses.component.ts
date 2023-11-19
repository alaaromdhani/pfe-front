import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddVideoCourseComponent } from './add-video-course/add-video-course.component';
import { AddDocumentCourseComponent } from '../document-courses/add-document-course/add-document-course.component';
import { CoursVideo } from 'src/app/models/CoursVideo';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.scss'],
})

export class VideoCoursesComponent{
  public id:number
  public maxRating = 5
  public choosen='document'
  public permissions:{[key:string]:string[]}

  public getPermissions(){
    this.configService.getPermissions(['coursvideo']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
  public ratingStar:{[key:number]:boolean}={

  }
  public dummy:number[]=[]
  public videoCourses:CoursVideo[] = []
  public rateStars:{[key:string]:boolean} = {
    
  }
  public ratingChanged(event:any){
    console.log(event)
  }
  constructor(public modalController:ModalController,public courseService:CourseService,public activatedRoute:ActivatedRoute,public toast:ToastController,public configService:ConfigService) { }
  public isFloat(num:number):boolean{
    return Math.floor(num)!==num

  }
  ionViewDidEnter() {
    this.getPermissions()
    this.activatedRoute.params.subscribe(data=>{
      this.id = data['id']
      this.getVideoCourses()
    })
    for(let i=1;i<=this.maxRating;i++){
      this.dummy.push(i)
      this.ratingStar[1] = false
    }

  }
  public onRate(vidId:number,num:number){
    
    for(let i=1;i<=this.maxRating;i++){
      if(i<=num){
        this.rateStars[vidId+'-'+i]=true
      }
      else{
        this.rateStars[vidId+'-'+i]=false
      }
    }
    this.courseService.rateVideoCourse(vidId,{rating:num}).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.getVideoCourses()
    })
  } 
  public async watchVideo(id:number){
    let link = this.videoCourses.filter(c=>c.id===id).map(c=>c.url)[0]
    let videoId = link.split('/').pop()
    let modal = await  this.modalController.create({
      component:VideoPlayerComponent,
      componentProps:{
        id:videoId
      }
    })
    modal.onDidDismiss().then(data=>{
      console.log(data)
    })
    return await modal.present();

  }
  public async addVideoCourse(){
  
      let modal = await  this.modalController.create({
        component:AddVideoCourseComponent,
        componentProps:{
          parent:this.id
        }
      })
      modal.onDidDismiss().then(data=>{
        if(data.data){
          this.getVideoCourses()
        }
      })

      return await modal.present();
  

  }
  public getVideoCourses(){
  this.courseService.getVideoCourses(this.id).subscribe(data=>{
    this.videoCourses =data.data.data 
  })    

  }
  public async  updateCourse(id:number){
    let course = this.videoCourses.filter(c=>c.id===id)[0]
    
    let modal = await  this.modalController.create({
      component:AddVideoCourseComponent,
      componentProps:{
        course
      }
    })
    modal.onDidDismiss().then(data=>{
      if(data.data){
        this.getVideoCourses()
      }
    })

    return await modal.present();
  }
  public getData(){
    
  }
  public viewVideo(){

  }
  public viewDocument(){

  }
  public deleteCourse(id:number){
    this.courseService.delteVideoCourse(id).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.getVideoCourses()
    },err=>{
      HandlerError(this.toast,err)
    })
  }

}
