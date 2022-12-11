import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  langagues = [
    { description: 'PT', value: 1 },
    { description: 'EN', value: 2 }
  ];
  user: any = {};


  constructor() { }

  ngOnInit(): void {
  }

}
