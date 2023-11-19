import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-upload',
  templateUrl: './add-upload.component.html',
  styleUrls: ['./add-upload.component.scss'],
})
export class AddUploadComponent  implements OnInit {
  @ViewChild('hiddenInput') input:HTMLElement
  constructor() { }

  ngOnInit() {}
  uploadFile(){
    console.log('ala')
    let input  = document.querySelector('input')
    if(input){
      console.log('let us click on the button')
      input.click()
    }
    else{
      console.log('element not found')
    }
  }


}
