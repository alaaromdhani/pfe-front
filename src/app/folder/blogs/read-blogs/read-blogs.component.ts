import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CommentsComponent } from './comments/comments.component';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/models/Blog';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-read-blogs',
  templateUrl: './read-blogs.component.html',
  styleUrls: ['./read-blogs.component.scss'],
})
export class ReadBlogsComponent{
  public descriptions:{
    [key:number]:string
  } = {}
  public blogs:Blog[]
  public permissions:{[key:string]:string[]}
  public getPermissions(){
    this.configService.getPermissions(['blog','blogcomment']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
  public async displayComments(id:number){
    //console.log('ala')
    const modal = await this.modalController.create({
      component:CommentsComponent,
      cssClass: 'transparent-modal',
      componentProps:{
        id
      }
    })
    return await modal.present();
    
  }
  constructor(public modalController:ModalController,public router:Router,public blogService:BlogService,public toast:ToastController,public stanitizer:DomSanitizer,public configService:ConfigService) { }
  
  addBlog(){
    this.router.navigate(['/folder/blogs/add'])
  }
  public getBlogs(){
    this.blogService.getBlogs().subscribe(data=>{
      this.blogs = data.data.data
      this.initializeBlogs()
      
  },err=>{
    HandlerError(this.toast,err)
  })
  }
  ionViewDidEnter() {
    this.getPermissions()
    this.getBlogs()
  }
  public sanitizeHtml(html:string):SafeHtml{
    return this.stanitizer.bypassSecurityTrustHtml(html)

  }
  public initializeBlogs(){
    this.blogs.forEach(b=>{
        //@ts-ignore
        this.descriptions[b.id] = this.sanitizeHtml(b.description)
    })
  }
  updateBlog(id:number){
    this.router.navigate(['/folder/blogs/update-blog/'+id])
  }
  deleteBlog(id:number){
    this.blogService.deleteBlog(id).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.getBlogs()

    },err=>{
      HandlerError(this.toast,err)

    })

  }


}
