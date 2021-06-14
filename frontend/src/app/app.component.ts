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
  constructor(private http:HttpClient) {}
  ngOnInit() {this.getSheet()}

  getSheet() {
    this.http.get('http://localhost:3000').subscribe(
      result => {
        // console.log(result)
        // console.log(result[0].firstName)
        for(let obj in result){
          console.log(`first name: ${result[obj].firstName}\nlast name: ${result[obj].lastName}`)
        }
      },
      error => {
        console.log("unsuccessful");
      }
    );
  }
}
