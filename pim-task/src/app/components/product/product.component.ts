import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Products: any[] = [];
  response: any = {};  
  proItem:any = {id:0, name:"", product_Code :"", price: "", quantity:"", categories:""};
  isUpdateMode: boolean = false;
  currentIndex: number = 0;
  constructor(private apiService: ApiServiceService,private _activatedRoute: ActivatedRoute, private router:Router) {

    
  }
  
  GetAllProducts() {

      this.apiService.getProducts().subscribe(
        result => {
          this.response = result;
          this.Products = this.response.results;
          console.log(result)
        },
        error => {
          console.log(error)
        },
        () => {
          console.log('Done');
        })
  }

  ClosePopup() {
    $("#myModal").hide();
  }

  // to verify that all inputs touched 
  checkFormsFields() {
    for (let inner in this.form.controls) {
      this.form.get(inner).markAsTouched();
    }
  }

  queryStringValue;
  form: FormGroup;
  ngOnInit() {

    this.form = new FormGroup({
      'ProductName': new FormControl('', [Validators.required]),
      'ProductCode': new FormControl('', [Validators.required]),
      'ProductPrice': new FormControl('', [Validators.required]),
      'ProductQuantity': new FormControl('', [Validators.required]),
      'ProductCategories': new FormControl('', [Validators.required]),
       
    });

    var modal = document.getElementById("myModal");

    // When the user clicks on <span> (x), close the modal
    $("span.close").click(function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    let categoryId = this._activatedRoute.snapshot.paramMap.get('id');

    if(categoryId != undefined && categoryId != null && Number(categoryId) != 0){            
      
      this.getGategoryProducts(Number(categoryId));

    } else {

      this.GetAllProducts();
    }        
  }
    
  getGategoryProducts(categoryId) {
    this.apiService.getGategoryProducts(categoryId).subscribe(
      result => {
        
        this.response = result;
        this.Products.push(this.response);
        console.log(result)
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('Done');
      })
  }

  addNewPost() {

    this.isUpdateMode = false;
    this.currentIndex = 0;
    this.proItem.name = "";
    this.proItem.id = 0;

    $("#myModal").show();
  }

  EditPost(product, i) {

    this.isUpdateMode = true;
    this.currentIndex = i;
    this.proItem.id = product.id;
    this.proItem.name = product.name;

    //open popup
    $("#myModal").show();      
  }

  SubmitPost({ valid, value }) {

    this.checkFormsFields();

    if (valid) {

      if (this.isUpdateMode) {        

        this.apiService.Update(this.proItem).subscribe(
          result => {
            alert("post has been Updated successfully ..!!!")
            console.log(result)
            //this.currentIndex = 0;
          },
          error => {
            alert("post is not Updated ..!!!")
            console.log(error)
          },
          () => {
            console.log('Done');
          })
        } else {                

          this.apiService.save(this.proItem).subscribe(
            result => {
              
              console.log(result);
  
              alert("post has been created successfully ..!!!")
              
              let response:any = result;
  
              this.proItem.id = response.id;
  
              this.Products.unshift(this.proItem);
  
              $("#myModal").hide();
              
              console.log(result)
            },
            error => {
  
              alert("post is not created ..!!!");
  
              console.log(error);
            },
            () => {
              console.log('Done');
            });
        }
      } else {
        console.log("form is not valid");
    }
  }

  save(product:any){
    this.apiService.save(product).subscribe(
      result => {
        alert("post has been Created successfully ..!!!")
        console.log(result)
        this.router.navigate(['/'])
      },
      error => {
        alert("post is not Created ..!!!")
        console.log(error)
      },
      () => {
        console.log('Done');
      })
  }
  
  RemovePost(product,index){ 

    this.apiService.removeCategory(product.id).subscribe(
      result => {
        alert("post has been removed successfully ..!!!")

        this.Products.splice(index, 1);

        console.log(result)
      },
      error => {
        alert("post is not removed ..!!!")
        console.log(error)
      },
      () => {
        console.log('Done');
      })
  }

}
