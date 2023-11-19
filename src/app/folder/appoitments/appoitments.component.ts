import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild,AfterContentChecked } from '@angular/core';
import { register } from 'swiper/element/bundle';

register()

@Component({
  selector: 'app-appoitments',
  templateUrl: './appoitments.component.html',
  styleUrls: ['./appoitments.component.scss'],
})
export class AppoitmentsComponent  implements OnInit,AfterContentChecked {
  public localDate = new Date()
  public currentMonthYear=false
  public showDatePicker:boolean=false;
  public calendar = new Date()
  public previousDays:number[] = []
  public nextDays:number[] = []
  
  public monthDays = new Date().getDate()
  public calWeekDays:string[]= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  public days:number[] = []
  public calMonthName= [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  public monthImages:{} = {
    "Jan":'bkg_01_january.jpg',
    "Feb":'bkg_02_february.jpg',
    "Mar":'bkg_03_march.jpg',
    "Apr":'bkg_04_april.jpg',
    "May":'bkg_05_may.jpg',
    "Jun":'bkg_06_june.jpg',
    "Jul":'bkg_07_july.jpg',
    "Aug":'bkg_08_august.jpg',
    "Sep":'bkg_09_september.jpg',
    "Oct":'bkg_10_october.jpg',
    "Nov":'bkg_11_november.jpg',
    "Dec":'bkg_12_december.jpg'

  }

  
 // public isAppoitmentsActive:boolean=false
  
  
  public onHoldappoitments = [{
    name:"Ala Romdhani",
    createdAt:"July 7 2023",
    image:"assets/images/m.png"

  },
  {
    name:"Test Patient",
    createdAt:"August 10 2023",
    image:"assets/images/m.png"

  },
  {
    name:"First Patient",
    createdAt:"June 9 2023",
    image:"assets/images/m.png"

  }]
  public assignedAppoitments:Array<{name:string,createdAt:string,image:string,time:string}> = [

  ]
  constructor() { }

  ngOnInit() {
    this.setDays()
      this.highligthEvents()
    for(let i=9;i<16;i++){
      this.assignedAppoitments.push({
        name:"",
        createdAt:"",
        image:"",
        time:""+(i>=10?i:"0"+i)+"-"+((i+1)>=10?(i+1):"0"+(i+1))
      })
    }
  }
 
  ngAfterContentChecked(){
   
  }
  drop(event:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  public setNextPreviousMonth(){
    const firstDay = this.getFirstDay()
    let previousMonthDays = new Date(this.calendar.getFullYear(),this.calendar.getMonth(),0).getDate()   
    for(let i= firstDay;i>0;i--){
        this.previousDays.unshift(previousMonthDays--)
    }
    let lastDay = this.getLastDay()
    
    let nextMonthDays = 1
    for(let i= lastDay+1;i<7;i++){
      this.nextDays.push(nextMonthDays++)
    }
  
}
public getFirstDay(){
    return (new Date(this.calendar.getFullYear(),this.calendar.getMonth(),1)).getDay()
}
public getLastDay(){
    return (new Date(this.calendar.getFullYear(),this.calendar.getMonth()+1,0)).getDay()
}

public setDays(){
  if(this.localDate.getMonth()==this.calendar.getMonth()&&this.localDate.getFullYear()==this.calendar.getFullYear()){
    this.currentMonthYear = true

  }
  else{
    this.currentMonthYear = false

  }
 
  if(this.days.length){
    this.days= []
  }
  if(this.previousDays.length){
    this.previousDays= []
  }
  if(this.nextDays.length){
    this.nextDays= []
  }
  this.monthDays = (new Date(this.calendar.getFullYear(),this.calendar.getMonth()+1,0)).getDate()
    
  for(let i=1;i<this.monthDays+1;i++){
    this.days.push(i)
  }
  
  this.setNextPreviousMonth()


}
public goPrev(){
  this.calendar.setMonth(this.calendar.getMonth()-1)
  this.setDays()
}
public goNext(){
  this.calendar.setMonth(this.calendar.getMonth()+1)
  this.setDays()
}
public highligthEvents(){
  //to do 


}
public getMonthImage(){
  //@ts-ignore
    let monthImgae =this.monthImages[this.calMonthName[this.calendar.getMonth()]]
    if(typeof monthImgae=='string'){
      return '/assets/months/'+monthImgae
    }
    return ""
  }

  

}
