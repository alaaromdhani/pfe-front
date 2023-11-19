import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-profile-photo-option',
  templateUrl: './profile-photo-option.component.html',
  styleUrls: ['./profile-photo-option.component.scss'],
})
export class ProfilePhotoOptionComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  

public async takePicture() {
  console.log('taking a picture from the gallery')
  
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  var imageUrl = image.webPath;

  // Can be set to the src of an image now
  this.closeModal(imageUrl)
  };
  public async openGallery(){
    let cameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    } 
    const image = await Camera.getPhoto(cameraOptions);
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    this.closeModal(imageUrl)

  }
  closeModal(data:string|undefined) {
    this.modalController.dismiss(data, 'backdrop');
  }
}
