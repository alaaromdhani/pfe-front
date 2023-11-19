import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-upload',
  templateUrl: './read-upload.component.html',
  styleUrls: ['./read-upload.component.scss'],
})
export class ReadUploadComponent  implements OnInit {
  public images = [
    {
      name:'image 123',
      link:'assets/images/m.png',
      type:'images'
    },
    {
      name:'wow upload',
      link:'assets/images/m.png',
      type:'doc'
    },
  ]
  constructor(public router:Router) { }
  public addUpload(){
    this.router.navigate(['/folder/medialibrary/add-uploads'])
  }
  ngOnInit() {}
  deleteImage(){


  }
  startUpload(){

  }


}
