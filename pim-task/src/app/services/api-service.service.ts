import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  constructor(private http: HttpClient) { 
  }
  
  // Category Methods

  getCategories(){
      return this.http.get("http://127.0.0.1:8000/Category/");      
  }
  
  createCategory(category:any){
     return this.http.post("http://127.0.0.1:8000/Category/",category);
  }

  updateCategory(category:any){
    return this.http.put("http://127.0.0.1:8000/Category/" + category.id, category);
  }

  removeCategory(postId:number){
    return this.http.delete("http://127.0.0.1:8000/Category/" + postId);
  }

  // Products Methods

  getProducts(){
      return this.http.get("http://127.0.0.1:8000/Products/");      
  }

  getGategoryProducts(id){
    return this.http.get("http://127.0.0.1:8000/Products/" + id);      
  }

  save(product:any){     
    return this.http.post("http://127.0.0.1:8000/Products/",product);
  }

  Update(product:any){
    return this.http.put("http://127.0.0.1:8000/Products/" + product.id, product);
  }

  remove(postId:number){
    return this.http.delete("http://127.0.0.1:8000/Products/" + postId);
  }

}
