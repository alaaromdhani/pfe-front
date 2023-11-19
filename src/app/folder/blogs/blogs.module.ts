import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ReadBlogsComponent } from './read-blogs/read-blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill';
import { CommentsComponent } from './read-blogs/comments/comments.component';

const routes:Routes=[
  { 
    path:'add',
    component:AddBlogComponent

  },
  { 
    path:'update-blog/:id',
    component:AddBlogComponent

  },
  {
    path:'read',
    component:ReadBlogsComponent
  }

]

@NgModule({
  declarations: [AddBlogComponent,ReadBlogsComponent,CommentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    QuillConfigModule.forRoot({

      modules:{
        syntax:true,
        toolbar:[
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': ['green'] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': ['IRANSans', 'roboto', 'cursive', 'fantasy', 'monospace'] }],
          [{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })

    
  ]
})
export class BlogsModule { }
