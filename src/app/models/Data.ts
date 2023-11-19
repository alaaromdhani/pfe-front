export class Data<T>{
    
    public success: true;
    public data:T[]       
    public page :number;
    public limit :number
    public totalCount: number
    public totalPages: number
    constructor(success: true,
        data:  T[],       
        page :number,
        limit :number,
        totalCount: number,
        totalPages: number){
                this.success   =success
                this.data      =  data
                this.page      =page
                this.limit     =limit
                this.totalCount=totalCount
                this.totalPages=totalPages
               

    }




}
export class ResponseDataPagination<T>{
    
   
    public data:Data<T>      
    public message :string;
    


}
export class ResponseData<T>{
    
   
    public data:T      
    public message :string;
    


}