import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable,  merge } from 'rxjs';
import {map} from 'rxjs/operators'
import { Field } from 'src/app/models/Field';
import { CourseService } from 'src/app/services/course.service';
import { HandlerError } from 'src/utils/ResultHandlor';
import { AddCourseComponent } from './add-course/add-course.component';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
export class DynamicFlatNode {
  constructor(public name: string, public level = 1, public expandable = false,
              public isLoading = false,public type:string,public id:number,public Courses?:DynamicFlatNode[] ,public CoursDocuments?:DynamicFlatNode[]|undefined,public CoursVideos?:DynamicFlatNode[]|undefined,public validated?:boolean|null,public rating?:number|undefined) {}
}
export class UniqueForm{
  constructor(public id:number,public name:string,public type:string,public Courses?:UniqueForm[]|undefined,public CoursDocuments?:UniqueForm[]|undefined,public CoursVideos?:UniqueForm[]|undefined,public validated?:boolean|undefined,public rating?:number|undefined){}

}
export class DynamicDatabase {
  
  public data:UniqueForm[]=[]
  constructor(data:Field[]){
    let fields = data
    
    fields.forEach(element=>{
     let field = new UniqueForm(element.id,element.name,'field',[])
     element.Courses.forEach(c=>{
        let course = new UniqueForm(c.id,c.name,'course',undefined,[],[],undefined,c.rating)
        
        c.CoursDocuments.forEach(cd=>{
           course.CoursDocuments?.push(new UniqueForm(cd.id,cd.name,'coursdocument',undefined,undefined,undefined,false,cd.rating)) 
        })
        c.CoursVideos.forEach(cd=>{
          course.CoursVideos?.push(new UniqueForm(cd.id,cd.name,'coursvideo',undefined,undefined,undefined,false,cd.rating)) 
       })
      
       field.Courses?.push(course)
      })
      this.data.push(field)
      
      

    })
    this.rootLevelNodes = this.data.filter(d=>d.type=='field');
  }
  rootLevelNodes: UniqueForm[] = []
  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    
    return this.rootLevelNodes.map(f => {
        //@ts-ignore
        
      return new DynamicFlatNode(f.name, 0,f.Courses &&f.Courses.length>0,false,'field',f.id,f.Courses||[])
    });
  }

  getChildren(node: DynamicFlatNode): DynamicFlatNode[]| undefined {
    
    if(node.type=='field'){
      let arr :DynamicFlatNode[]= []
      
      if(node.Courses){

        node.Courses.forEach(c=>{
          let isExpandable:boolean =c.CoursDocuments&&c.CoursVideos? (c.CoursDocuments?.length>0)||(c.CoursVideos?.length>0):false
          arr.push(new DynamicFlatNode(c.name,node.level+1,isExpandable,false,'course',c.id,undefined,c.CoursDocuments,c.CoursVideos,undefined,c.rating))

        })
      }
      return arr
    }
    if(node.type=='course'){
      let arr:DynamicFlatNode[] = []
      if(node.CoursDocuments){
        node.CoursDocuments.forEach(c=>{
          arr.push(new DynamicFlatNode(c.name,node.level+1,false,false,c.type,c.id,undefined,undefined,undefined,c.validated,c.rating))

        })
    
        
      }
      if(node.CoursVideos){
        node.CoursVideos.forEach(c=>{
          arr.push(new DynamicFlatNode(c.name,node.level+1,false,false,c.type,c.id,undefined,undefined,undefined,c.validated,c.rating))

        })
      }
      
      
      return arr
    
    }
    return []
  }

  isExpandable(node: DynamicFlatNode): boolean {
    if(node.type=='field'){
      if(node.Courses){
        if(node.Courses.length){
          return true
        }
        return false
      }
      return false
    }
    if(node.type=='course'){
      let arr:DynamicFlatNode[] = []
      if(node.CoursDocuments){
        arr = arr.concat(node.CoursDocuments)
      }
      if(node.CoursVideos){
        arr = arr.concat(node.CoursVideos)
      }
      
      
      return arr.length>0
    
    }
    return false
  }
}

@Injectable()
export class DynamicDataSource {
  
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    
    this.treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node);
    const index = this.data.map(d=>d.id+''+d.type).indexOf(node.id+''+node.type);
    console.log(index+1)
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children
        console.log('setting the nodes in position '+(index+1))
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }

}

@Component({
  selector: 'app-parent-courses',
  templateUrl: './parent-courses.component.html',
  styleUrls: ['./parent-courses.component.scss'],
})
export class ParentCoursesComponent  implements OnInit {
  public dummy= [1,2,3,4,5]
  public permissions:{[key:string]:string[]}

  constructor(public courseService:CourseService,public toast:ToastController,public modalController:ModalController,public router:Router,public configService:ConfigService) {

    
  }
  public getPermissions(){
    this.configService.getPermissions(['course']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
    public isReady=false
  public database:DynamicDatabase
  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  public initializeData(){
    this.courseService.coursesTree().subscribe(data=>{
      this.database = new DynamicDatabase(data.data)
        
  
     
      this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new DynamicDataSource(this.treeControl, this.database);
      this.dataSource.data = this.database.initialData();   
      this.isReady=true
    },err=>{
      HandlerError(this.toast,err)

    })
  }
  ngOnInit(): void {

    this.initializeData()    
    this.getPermissions()   
  }
  public async addCourse(){
    let modal = await this.modalController.create({
      component:AddCourseComponent
    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.initializeData()
      }
      
    })
    return await modal.present()

  }
  public viewCourse(node:DynamicFlatNode){
      //console.log(node.rating)
      this.router.navigate(['/folder/doctor-space/courses/'+node.id+'/video'])

  }

}
