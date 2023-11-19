import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController, ToastController } from '@ionic/angular';
import { ProfilePhotoOptionComponent } from '../../profile-updater/profile-photo-option/profile-photo-option.component';
import { Blog } from 'src/app/models/Blog';
import { Field } from 'src/app/models/Field';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { ConfigService } from 'src/app/services/config.service';
import { mimeToExtension } from 'src/utils/constants';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent  {
  public expanded:boolean=false
  public isFormReady=false
  public blogForm:FormGroup
  public photo:string = ""
  public currentBlog:Blog
  public allFields:Field[]
  public selectedFields:Field[]=[]
  public initPhoto=""
  public inputFocused:{[key:string]:boolean} = {

  }
  selectedField:{[key:string]:boolean}={

  }
  
  
  constructor(public fb:FormBuilder,public sanitizer :DomSanitizer,public modalController:ModalController,public blogSevice:BlogService,public activatedRoute:ActivatedRoute,public toast:ToastController,public configService:ConfigService,public router:Router) {
    
    this.isFormReady=false
    

   }
   sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  public reinitializePhoto(){
    this.photo = this.initPhoto

  }

  ionViewDidEnter() {
    
    
    
    this.activatedRoute.params.subscribe(async data=>{
      if(data['id']){
        try{
          this.currentBlog = await new Promise<Blog>((resolve,reject)=>{
            this.blogSevice.findOneBlog(data['id']).subscribe(c=>{
                return resolve(c.data)
            },err=>{
              return reject(err)
            })
          })
          //@ts-ignore
          this.initPhoto=this.currentBlog.Banner?this.currentBlog.Banner.link:''
          this.photo =this.initPhoto
        }catch(e){
          HandlerError(this.toast,e)
        }
          
      }
      this.initForm()
       
      
    })

   // console.log(this.content)
  }
  public onFocus(key:string){
    this.inputFocused[key] = true
  }
  public onBlur(key:string){
    this.inputFocused[key] = false
  }
  
  public submitForm(){
   
    if(this.currentBlog){
      this.updateBlog()
    }
    else{
      this.addBlog()
    }

    //  console.log('submitted')
  }
  public async selectBannerImage(){
    let modal = await this.modalController.create({
      component:ProfilePhotoOptionComponent
    })
        modal.onDidDismiss()
    .then(res => {
      if(res.data==='undefined'){
          this.photo =''
        }
        else{
      //    console.log('setting to null')
          this.photo=res.data
        }
        
    });
    
    
    return await modal.present();
  }
  public initFields(){
      this.configService.getFieldsForBlogs().subscribe(data=>{
        this.allFields = data.data
        if(this.currentBlog){
         
          this.allFields.forEach(f=>{
           // console.log(this.currentBlog.Fields.some(fi=>fi.id===f.id))
           
            this.selectedField[f.id] = this.currentBlog.Fields.some(fi=>fi.id===f.id)
            
          })
          this.currentBlog.Fields.forEach(f=>{
            this.selectedFields.push(f)
          })
         
        }  
        else{
          this.selectedFields=[]          
          this.allFields.forEach(f=>{
            this.selectedField[f.id] = false
            
          })
        }
        this.isFormReady=true
      },err=>{
        HandlerError(this.toast,err)
      }) 

    
  }
  public initForm(){
    if(this.currentBlog){
      
      let inputs  = {
        title:[this.currentBlog.title,Validators.required],
        description:[this.currentBlog.title,Validators.required]
      }
      Object.keys(inputs).forEach(k=>{
        //@ts-ignore
        this.inputFocused[k] = inputs[k][0]!==''
      }) 
      this.blogForm = this.fb.group(inputs)   
    }
    else{
      let inputs  = {
        title:['',Validators.required],
        description:['',Validators.required]
      }
      Object.keys(inputs).forEach(k=>{
        //@ts-ignore
        this.inputFocused[k] = inputs[k][0]!==''
      })    

      this.blogForm = this.fb.group(inputs)
 
    }
    
    this.initFields()
    

  }
  public expandFieldsSection(){
   
    this.expanded?this.expanded=false:this.expanded=true
  //  console.log(this.allFields)
  }
  selectField(id:number){
    if(this.selectedField[id]){
      this.selectedField[id]=false
      //@ts-ignore
      this.selectedFields = this.selectedFields.filter(f=>f.id!==id)
    }
    else{
      this.selectedField[id]=true
      //@ts-ignore
      this.selectedFields.push(this.allFields.filter(f=>f.id===id).at(0))
    }
    //console.log(this.selectedFields)
  }
  public async uploadPhoto():Promise<Blob>{
   return await new Promise((resolve,reject)=>{
    fetch(this.photo).then(res=>{
      return res.blob()
    }).then(blobData=>{
      return resolve(blobData)
      //@ts-ignore
      
    }).catch(e=>{
      return reject(e)

    })

   }) 

  }

  public async updateBlog(){
      try{
        let formdata = new FormData()  
      Object.keys(this.blogForm.controls).filter(k=>{
        return this.blogForm.controls[k].value!=''
      }).forEach(k=>{
         formdata.append(k,this.blogForm.controls[k].value) 
      })
      if(this.selectedFields.length){
        formdata.append('fields',JSON.stringify(this.selectedFields.map(i=>i.id)))
       }
       else{
        throw new Error('fields are required')
       }
      if(this.photo && this.photo.startsWith('blob')){
       let blob:Blob = await  this.uploadPhoto()
       //@ts-ignore
       let extention = mimeToExtension[blob.type]?mimeToExtension[blob.type]:'jpg'
       formdata.append('banner',blob,'file.'+extention)
      }
      await new Promise((resolve,reject)=>{
        this.blogSevice.updateBlogs(this.currentBlog.id,formdata).subscribe(data=>{
          SuccessHandlor(this.toast,data.message)
          this.router.navigate(['/folder/blogs/read'])
        },err=>{
          reject(err)
        })

      })
      }catch(e){
        HandlerError(this.toast,e)
      }
      
  } 
  public async addBlog(){
    try{
      let formdata = new FormData()  
    Object.keys(this.blogForm.controls).filter(k=>{
      return this.blogForm.controls[k].value!=''
    }).forEach(k=>{
       formdata.append(k,this.blogForm.controls[k].value) 
    })
    if(this.selectedFields.length){
      formdata.append('fields',JSON.stringify(this.selectedFields.map(i=>i.id)))
     }
     else{
      throw new Error('fields are required')
     }
    if(this.photo && this.photo.startsWith('blob')){
     let blob:Blob = await  this.uploadPhoto()
     //@ts-ignore
     let extention = mimeToExtension[blob.type]?mimeToExtension[blob.type]:'jpg'
     formdata.append('banner',blob,'file.'+extention)
    }
    await new Promise((resolve,reject)=>{
      this.blogSevice.addBlogs(formdata).subscribe(data=>{
        SuccessHandlor(this.toast,data.message)
        this.router.navigate(['/folder/blogs/read'])
      },err=>{
        reject(err)
      })

    })
    }catch(e){
      HandlerError(this.toast,e)
    }

  }
  

}
