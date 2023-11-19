import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent  implements OnInit {
  public id:string
  public isReady=false
  constructor(public platform:Platform,public modalController:ModalController) { }

  ngOnInit() {
    console.log(this.id)
    this.isReady=true
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  public backToCourses(){
    this.modalController.dismiss(null,'dropdown')
  }

}
