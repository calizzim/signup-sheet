import { Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'signup-sheet',
  templateUrl: './signup-sheet.component.html',
  styleUrls: ['./signup-sheet.component.css']
})
export class SignupSheetComponent implements OnInit{
  title = 'frontend';
  names:[any];
  url = environment.backendURL

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

  addName(event) {
    this.http.post(this.url, event).subscribe(
      result => { this.getSheet() },
      error => { console.log(error) }
    );
  }

  
  deleteName(id){
    this.http.delete(this.url+id).subscribe(
      result => { this.getSheet() },
      error => { console.log(error) }
    );
  }

  inputForm = {
    title: 'Signup Sheet',
    groups: [
      {
        title: 'personalInfo',
        components: [
          {
            type: 'input',
            name: 'firstName',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(25)
            ]
          },
          {
            type: 'input',
            name: 'lastName',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(25)
            ]
          }
        ]
      }
    ]
  }
}

interface Response {
  body: [any]
}
