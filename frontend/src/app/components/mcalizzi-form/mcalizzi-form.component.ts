import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mcalizzi-form',
  templateUrl: './mcalizzi-form.component.html',
  styleUrls: ['./mcalizzi-form.component.css']
})
export class McalizziFormComponent implements OnInit {
  @Input() inputForm;
  @Output('formSubmitted') returnForm = new EventEmitter();

  form = new FormGroup({});

  isValid(groupName, fieldName) {
    const obj = this.form.get([groupName,fieldName])
    return obj.touched && !obj.errors
  }

  isInvalid(groupName, fieldName) {
    const obj = this.form.get([groupName, fieldName])
    return obj.touched && obj.errors
  }

  getMessage(groupName:string, name:string){
    const component = this.form.get(`${groupName}.${name}`);
    const errors:object = component.errors;
    if(!errors) return "looks good";
    if('required' in errors) return `${name} is required`
    if('minlength' in errors) return `${name} must be ${errors['minlength']['requiredLength']} characters long`
    if('maxlength' in errors) return `${name} must be shorter than ${errors['maxlength']['requiredLength']} characters`
    if('email' in errors) return `${name} must be a valid email`
  }

  
  constructor() { }
  
  onSubmit() {
    //make sure that the form is valid
    if(!this.form.valid) return
    //construct the return object
    let returnForm = {};
    for(let group of this.inputForm.groups){
      let formGroup = {};
      for(let component of group.components){
        formGroup[component.name] = this.form.get([group.title, component.name]).value;
      }
      returnForm[group.title] = formGroup;
    }
    this.returnForm.emit(returnForm)
  }
  
  ngOnInit(): void {
    for(let group of this.inputForm.groups){
      let formGroup = new FormGroup({});
      for(let component of group.components){
        let formControl = new FormControl('',component.validators);
        formGroup.addControl(component.name, formControl);
      }
      this.form.addControl(group.title,formGroup)
    }
  }
  
}