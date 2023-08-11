import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  //  title: "Hello World"

  constructor() {
    setTimeout(() => {
      // this.title = 'Hello Nadim';
    }, 2000);
  }
}
