import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { BlogComment } from 'src/app/models/BlogComment';
import { BlogService } from 'src/app/services/blog.service';
import { ConfigService } from 'src/app/services/config.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent  implements OnInit {
  public contents:{
    [key:string]:string
  }={}
  public id:number
  public commentForm:FormGroup
  public permissions:{[key:string]:string[]}
  public getPermissions(){
    this.configService.getPermissions(['blogcomment']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
  constructor(private modalController:ModalController,public router:Router,public blogservice:BlogService,public formBuilder:FormBuilder,public toast:ToastController,public stanitizer:DomSanitizer,public configService:ConfigService) { 
    this.initForm()
  }
  public closeModal(){
      this.modalController.dismiss()
  }
  public submitForm(){
    this.addComment()
  }
  public initForm(){
    this.commentForm = this.formBuilder.group({
      content:['',Validators.required],
    })    
    
  }
  public comments:BlogComment[] = []
  ngOnInit() {
      this.getPermissions()
      this.getComments()  
  }
  public getComments(){
    this.blogservice.getComments(this.id).subscribe(data=>{
      this.comments = data.data.data
      this.initCommentContents()
    })
  }
  public deleteComment(id:number){
    this.blogservice.deleteComment(id).subscribe(res=>{
      SuccessHandlor(this.toast,res.message)
      this.getComments()
    },err=>{
      HandlerError(this.toast,err)
    })


  }
  public addComment(){
    const content = this.commentForm.controls['content'].value
    //console.log(content)
    this.blogservice.addComment({content,blog_id:this.id}).subscribe(res=>{
      SuccessHandlor(this.toast,res.message)
      this.getComments()
    },err=>{
      HandlerError(this.toast,err)
    })

  }
 public initCommentContents(){
    this.comments.forEach(c=>{
     //@ts-ignore
      this.contents[c.id] = this.sanitizeHtml(c.content)
    })
  }
  public sanitizeHtml(html:string):SafeHtml{
    return this.stanitizer.bypassSecurityTrustHtml(html)

  }
   

}
