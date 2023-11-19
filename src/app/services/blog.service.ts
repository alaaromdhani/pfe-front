import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData, ResponseDataPagination } from '../models/Data';
import { Blog } from '../models/Blog';
import { baseLink } from 'src/utils/constants';
import { BlogComment } from '../models/BlogComment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public http:HttpClient) { }
  public getBlogs(){
    return this.http.get<ResponseDataPagination<Blog>>(baseLink+'/api/v1/blogs',{
      withCredentials:true
    })
  }
  public addBlogs(formdata:FormData){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/blogs',formdata,{
      withCredentials:true
    })
  }
  public updateBlogs(id:number,formdata:FormData){
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/blogs/'+id,formdata,{
      withCredentials:true
    })
  }
  public findOneBlog(id:number){
   return  this.http.get<ResponseData<Blog>>(baseLink+'/api/v1/blogs/'+id,{
      withCredentials:true
    })
  }
  public deleteBlog(id:number){
    return this.http.delete<ResponseData<any>>(baseLink+'/api/v1/blogs/'+id,{
      withCredentials:true
    })
  }
  public getComments(blog_id:number){
    return this.http.get<ResponseDataPagination<BlogComment>>(baseLink+'/api/v1/blogcomments?blog_id='+blog_id,{
      withCredentials:true
    })
  }
  public addComment(comment:any){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/blogcomments',comment,{
      withCredentials:true
    })
  }
  public deleteComment(comment_id:number){
    return this.http.delete<ResponseData<any>>(baseLink+'/api/v1/blogcomments/'+comment_id,{
      withCredentials:true
    })
  }
}
