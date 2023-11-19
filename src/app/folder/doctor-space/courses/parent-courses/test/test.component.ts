import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers:[]
})

export class TestComponent implements OnInit  {

  constructor() {
    
    
  }
  public viewDocument(){
    console.log('choose document')
  }
  public viewVideo(){
    console.log('choose video')
  }
  ngOnInit(): void {
    
  }
}
