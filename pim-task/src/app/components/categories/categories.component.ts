import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  
  posts: any[] = [];
  response: any = {};  
  postItem:any = {id:0, name:""};
  isUpdateMode: boolean = false;
  currentIndex: number = 0;  

  constructor(private apiService: ApiServiceService,private _activatedRoute: ActivatedRoute, private router:Router) {

      this.GetAllCategories();
  }

  GetAllCategories() {
    this.apiService.getCategories().subscribe(
      result => {
        this.response = result;
        this.posts = this.response.results;
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
  
  form: FormGroup;
  ngOnInit() {

    this.form = new FormGroup({
      'PostName': new FormControl('', [Validators.required])
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
  }

  addNewPost() {

    this.isUpdateMode = false;
    this.currentIndex = 0;
    this.postItem.name = "";
    this.postItem.id = 0;

    $("#myModal").show();
  }

  EditPost(category, i) {

    this.isUpdateMode = true;
    this.currentIndex = i;
    this.postItem.id = category.id;
    this.postItem.name = category.name;

    //open popup
    $("#myModal").show();      
  }

  SubmitPost({ valid, value }) {

    this.checkFormsFields();

    if (valid) {

      if (this.isUpdateMode) {        

        this.apiService.Update(this.postItem).subscribe(
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

        this.apiService.save(this.postItem).subscribe(
          result => {
            
            console.log(result);

            alert("post has been created successfully ..!!!")
            
            let response:any = result;

            this.postItem.id = response.id;

            this.posts.unshift(this.postItem);

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

  save(category:any){
    this.apiService.save(category).subscribe(
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

  RemovePost(category,index){    

    this.apiService.removeCategory(category.id).subscribe(
      result => {
        alert("post has been removed successfully ..!!!")

        this.posts.splice(index, 1);

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
