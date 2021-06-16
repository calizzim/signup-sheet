import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){}
  onSubmit(event){
    console.log(event)
  }

  inputForm = {
    title: 'Form Testing',
    groups: [
      {
        title: 'account information',
        components: [
          {
            type: 'input',
            name: 'username',
            validators: [
              Validators.required
            ]
          },
          {
            type: 'input',
            name: 'password',
            validators: [
              Validators.required,
              Validators.minLength(8)
            ]
          }
        ]
      },
      {
        title: 'adress information',
        components: [
          {
            type: 'input',
            name: 'street adress',
            validators: [
              Validators.required
            ]
          },
          {
            type: 'input',
            name: 'city',
            validators: [
              Validators.required,
            ]
          },
          {
            type: 'input',
            name: 'state',
            validators: [
              Validators.required,
            ]
          },
          {
            type: 'input',
            name: 'zipcode',
            validators: [
              Validators.required,
            ]
          }
        ]
      },
    ]
  }
}
