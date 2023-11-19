import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BooleanValueAccessor, Platform } from '@ionic/angular';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent  implements OnInit {
  @Output() valueChange = new EventEmitter();
  public isInputShown:boolean=false

   public searchString:string = '' 
  constructor(public platform:Platform) { }
  public showInput(){
  //  let inputWidth = this.platform.width()-50
    //console.log(this.platform.width)
    //let section = document.querySelector('#section') as HTMLElement
    let input = document.querySelector('#search') as HTMLInputElement
    if(input.style.width=='0px'){
      
      input.style.width  =(this.platform.width()-90)+'px';
      
      input.style.visibility = 'visible'
     // section.style.marginLeft='100px'
    }
    else{
      input.style.width  ='0px';
      
     
      setTimeout(()=>{
       // section.style.marginLeft='300px'
          input.style.visibility = 'hidden';
 
      },300)  
    }
    
  }
  changeValue(){
    this.valueChange.emit(this.searchString)
  }
  ngOnInit() {}

}
