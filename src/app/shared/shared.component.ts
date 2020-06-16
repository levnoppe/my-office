import { Component, OnInit } from '@angular/core';

export function sortFunc(a, b) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


}
