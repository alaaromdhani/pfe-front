import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParentCoursesComponent } from './parent-courses/parent-courses.component';
import { DocumentCoursesComponent } from './document-courses/document-courses.component';
import { VideoCoursesComponent } from './video-courses/video-courses.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddCourseComponent } from './parent-courses/add-course/add-course.component';
import { AddDocumentCourseComponent } from './document-courses/add-document-course/add-document-course.component';
import { AddVideoCourseComponent } from './video-courses/add-video-course/add-video-course.component';
import { VideoPlayerComponent } from './video-courses/video-player/video-player.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { TestComponent } from './parent-courses/test/test.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { SharedModule } from 'src/app/shared/shared.module';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
const routes :Routes=[
{
    path:'',
  component:ParentCoursesComponent
},
{
    path:'test',
  component:TestComponent
},
{
  path:':id/document',
  component:DocumentCoursesComponent
},
{
  path:':id/video',
  component:VideoCoursesComponent
}

]


@NgModule({
  providers:[Chooser],
  declarations: [VideoCoursesComponent,DocumentCoursesComponent,ParentCoursesComponent,AddCourseComponent,AddDocumentCourseComponent,AddVideoCourseComponent,VideoPlayerComponent,TestComponent],
  imports: [
    YouTubePlayerModule,
    MatTreeModule,
    CommonModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
    CdkTreeModule,
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoursesModule { }
