import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDocumentCourseComponent } from './add-document-course/add-document-course.component';

@Component({
  selector: 'app-document-courses',
  templateUrl: './document-courses.component.html',
  styleUrls: ['./document-courses.component.scss'],
})
export class DocumentCoursesComponent  implements OnInit {

  constructor(public modalController:ModalController) { }
  public async addDocumentCourse(){
    let modal = await this.modalController.create({
      component:AddDocumentCourseComponent
    })
    modal.onDidDismiss().then(res=>{
      console.log(res)
    })
    return await modal.present();

  }
  
  ngOnInit() {}

}
