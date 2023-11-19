import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';
import { StaffService } from 'src/app/services/staff.service';
import { baseLink } from 'src/utils/constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  public loader = false
  public user_id:number
  public io:any
  public baseLink:string=baseLink
  //@ts-ignore
  public chatRoom:ChatRoom
  public currentMessage:string =""
  public previousMessage:string=""
  public messages:Message[] = []
  public numberOfMessages =0
  public roomId:number=0
  public otherUsers:User[] = []
  public $destroy = new Subject()
  public subsciption = new Subscription()
  public chatMembers =new Map<number,User>()
  public currentUser:User|null = null
  public typingUser:User|null = null
  constructor(public modal:ModalController,public chatService:ChatService,public changeDetector:ChangeDetectorRef,public staffService:StaffService) { }
  public  closeModal(){
    this.modal.dismiss()

  }
  ngOnInit() {
    
     this.chatService.connect()
            this.chatService.logData(this.roomId,this.user_id)

            this.io = this.chatService.io
            this.setEvents()
            
            this.staffService.getCurrentUser().subscribe(user=>{
                this.currentUser = user.data
                this.staffService.getChatRoom(this.roomId,this.user_id).subscribe(chatRoom=>{
                  this.chatRoom = chatRoom.data
                  this.otherUsers = this.getOtherMembers() 
                  //@ts-ignore
                  
                  this.chatRoom.Users?.forEach((u:User)=>{
                    console.log(u)
                    this.chatMembers.set(u.id,u)
                    
                   
                  })
                  if(this.chatRoom.Messages){
                    this.messages =this.chatRoom.Messages  
                  }

                })
                this.loader=true
                 
                 
              })
        
          
         this.subsciption =  interval(2000).pipe(takeUntil(this.$destroy)).subscribe(()=>{
            this.isTyping()
          })

  }
  public setEvents(){
    this.io.socket.on('message',(data:Message)=>{
      console.log(data.sender===this.currentUser?.id)
         this.messages.push(data)
        this.changeDetector.detectChanges()
      
      })
      this.io.socket.on('typing',(data:{user_id:number,status:boolean})=>{

        
            if(this.currentUser?.id!==data.user_id){
              if(this.chatMembers.has(data.user_id)){
                //@ts-ignore
                this.typingUser = this.chatMembers.get(data.user_id)
                 this.loader = data.status   
                 this.changeDetector.detectChanges()
              }
            }
        })
  }
  public getUser(user_id:number):User{
    //@ts-ignore
    return this.chatMembers.get(user_id)
  }
  public sendMessage(){
    
    this.chatService.sendMessage(this.roomId,this.currentMessage,this.user_id)
    this.currentMessage = ''
  }
  public getOtherMembers():User[]{
      //@ts-ignore
      return this.chatRoom.Users?.filter(u=>u.id!=this.currentUser.id)

  }
  public userTyping(event:any){
     
  }
  public isTyping(){
     if(this.currentMessage!=this.previousMessage){
      this.previousMessage = this.currentMessage
       
       this.chatService.sendStatus(this.roomId,"writing",this.user_id)
     }
     else{
      this.chatService.sendStatus(this.roomId,"not-writing",this.user_id)
      }
  }
  ngOnDestroy(){
 // Unsubscribe from the interval when the component is destroyed
    this.$destroy.complete();
    this.subsciption.unsubscribe(); 
  }



}
