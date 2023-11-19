import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Appoitment } from 'src/app/models/Appoitment';
import { AppoitmentService } from 'src/app/services/appoitment.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent  implements OnInit {
  public selectedMonthYear =false
  public CurrentMonthImage = ""
  public selectedDate =new Date() 
  public localDate = new Date()
  public currentMonthYear=false
  public showDatePicker:boolean=false;
  public calendar = new Date()
  public previousDays:number[] = []
  public nextDays:number[] = []
  public allAppoitments:Appoitment[]=[]
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
  public testAssigned:Appoitment[]=[]
  public testNotAssigned:Appoitment[]=[]

  public assignedAppoitments:Array<{name:string,createdAt:string,image:string,time:string}> = [

  ]
  constructor(public appoitmentService:AppoitmentService) { }
  public async getAppoitments(){
    return new Promise((resolve,reject)=>{
      this.testAssigned = []
      this.testNotAssigned = []
      
      this.appoitmentService.getAppoitments().subscribe(data=>{
        this.allAppoitments = data.data.data
        this.allAppoitments.forEach(a=>{
          if(!a.startingHour&&!a.endingHour){
              this.testNotAssigned.push(a)
          }
          
        })
        if(!this.testNotAssigned.length){
          this.testNotAssigned.push({
            Patient:undefined,
            addedBy:0,
            createdAt:'',
            date:'',
            endingHour:null,
            startingHour:null,
            id:0,
            message:''
          })
        }
        for(let i=9;i<16;i++){
         const item = this.allAppoitments.filter(a=>{
          if(!a.date){
            return false
          }
          let appoitmentDate = new Date(a.date)
          let today = new Date()
          return  appoitmentDate.getDate()==this.selectedDate.getDate() &&appoitmentDate.getMonth()==this.selectedDate.getMonth()&&appoitmentDate.getFullYear()==this.selectedDate.getFullYear() && a.startingHour===i
         })
         if(!item.length){
            this.testAssigned.push({
              Patient:undefined,
              addedBy:0,
              createdAt:'',
              date:'',
              endingHour:(i+1),
              startingHour:i,
              id:0,
              message:''
            })
         }
         else{
            this.testAssigned.push(item[0])
         }
         
         
        }
        console.log("assigned :",this.testAssigned)
        resolve({})
      },err=>{
        reject()

      })
      

    })

  }
  ngOnInit() {
    this.getAppoitments().then(data=>{
      console.log('operation done successfully')
    })
    this.setDays()
      this.highligthEvents()
    
  }
 
  ngAfterContentChecked(){
   
  }
  async drop(event:any) {
   
    let srcContainerId = Number(
      event.previousContainer.id.split('cdk-drop-list-').pop()
    );
    let targetContainerId = Number(
      event.container.id.split('cdk-drop-list-').pop()
    );
    if (event.previousContainer === event.container) { //from assigned to not assigned
        if(event.container.data[0].startingHour){
          if(!this.testAssigned[event.currentIndex].Patient){
            console.log('verified case')
           let empty = this.testAssigned[event.currentIndex]
            let assigned = this.testAssigned[event.previousIndex]
            await new Promise((resolve,reject)=>{
              this.appoitmentService.updateAppoitments(assigned.id,{startingHour:empty.startingHour,endingHour:empty.endingHour,date:this.selectedDate.toISOString()})
              .subscribe(data=>{
                resolve(data)
              })
            }).then(data=>{
              return this.getAppoitments()
            })
          }
          else{
            console.log('not verified case')
          }
        }
      /* const name = event.container.data[0].name  
      let assigned =this.assignedAppoitments.filter(item=>item.name==name).length?true:false 
      if(assigned){
        let previousTime = this.assignedAppoitments[event.previousIndex].time
        let currentTime =this.assignedAppoitments[event.currentIndex].time
        let previousData ={} 
        let currentData = {}
        Object.keys(this.assignedAppoitments[event.previousIndex]).filter(k=>k!="time").forEach(k=>{
          //@ts-ignore
          previousData[k] = this.assignedAppoitments[event.previousIndex][k]
          //@ts-ignore
          previousData['time'] = currentTime
        })
        Object.keys(this.assignedAppoitments[event.currentIndex]).filter(k=>k!="time").forEach(k=>{
          //@ts-ignore
          currentData[k] = this.assignedAppoitments[event.currentIndex][k]
         //@ts-ignore
          currentData['time'] = previousTime
   
        })
        //@ts-ignore
        this.assignedAppoitments[event.currentIndex] = previousData

        //@ts-ignore
        this.assignedAppoitments[event.previousIndex] = currentData
   
      }*/
      
        

    } else {
      
   
      if(targetContainerId>srcContainerId){
          const notAssigned = this.testNotAssigned[event.previousIndex]
          const assigned =  this.testAssigned[event.currentIndex]
          if(!assigned.Patient){
            await new Promise((resolve,reject)=>{
              this.appoitmentService.updateAppoitments(notAssigned.id,{startingHour:assigned.startingHour,endingHour:assigned.endingHour,date:this.selectedDate.toISOString()})
              .subscribe(data=>{
                resolve(data)
              })
            }).then(data=>{
              return this.getAppoitments()
            })
          }
          
        }
        else{
          let assigned = this.testAssigned[event.previousIndex]
          await new Promise((resolve,reject)=>{
            this.appoitmentService.updateAppoitments(assigned.id,{startingHour:null,endingHour:null,date:null})
            .subscribe(data=>{
              resolve(data)
            })
          }).then(data=>{
            return this.getAppoitments()
          })
        }
      /*if(targetContainerId>srcContainerId){
        console.log('this case')
          if(this.assignedAppoitments[event.currentIndex].name==""){

            console.log(event.previousContainer)
            Object.keys(this.onHoldappoitments[event.previousIndex]).forEach(k=>{
                //@ts-ignore
              this.assignedAppoitments[event.currentIndex][k] = this.onHoldappoitments[event.previousIndex][k]
  
            })
            this.onHoldappoitments.splice(event.previousIndex,1)  
          }

       }
      else{
        if(this.assignedAppoitments[event.previousIndex].name!=""){
            let previousAppoitment = {
              
              name:"",
              createdAt:"",
              image:"",
              time:this.assignedAppoitments[event.previousIndex].time

            }  
          let newAppoitment = {

            }
            Object.keys(this.assignedAppoitments[event.previousIndex]).filter(k=>k!="time").forEach(k=>{
              //@ts-ignore
              newAppoitment[k] = this.assignedAppoitments[event.previousIndex][k]

            })
            //@ts-ignore
            this.onHoldappoitments.push(newAppoitment)
            this.assignedAppoitments[event.previousIndex] = previousAppoitment
          }
       

      }
      
     */ 
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
  //@ts-ignore
  this.CurrentMonthImage = this.monthImages[this.calMonthName[this.calendar.getMonth()]]
  
  if(this.localDate.getMonth()==this.calendar.getMonth()&&this.localDate.getFullYear()==this.calendar.getFullYear()){
    this.currentMonthYear = true

  }
  else{
    this.currentMonthYear = false

  }
  if(this.selectedDate.getMonth()==this.calendar.getMonth()&&this.selectedDate.getFullYear()==this.calendar.getFullYear()){
    this.selectedMonthYear =true
  }
  else{
    this.selectedMonthYear=false
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
  console.log(this.calendar)
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
  public async selectDate(day:number){
  
    this.selectedDate =new Date(this.calendar.getFullYear(),this.calendar.getMonth(),day)
    this.selectedMonthYear =true
    await this.getAppoitments()
  }

  

}
