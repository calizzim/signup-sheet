import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  names:[any];
  url = 'http://localhost:3000/'
  constructor(private http:HttpClient) {}
  ngOnInit() {this.getSheet()}

  getSheet() {
    this.http.get(this.url).subscribe(
      (result:Response) => {
        this.names = result.body
      },
      error => {
        console.log("unsuccessful");
      }
    );
  }

  firstName = '';
  lastName = '';
  
  addName() {
    this.http.post(this.url, {
      firstName: this.firstName,
      lastName: this.lastName
    }).subscribe(
      result => { this.getSheet() },
      error => { console.log(error) }
    );
    this.firstName = '';
    this.lastName = '';
  }

  
  deleteName(id){
    this.http.delete(this.url+id).subscribe(
      result => { this.getSheet() },
      error => { console.log(error) }
    );
  }
}


interface Response {
  body: [any]
}