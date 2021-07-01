import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  aboutOpen = false;
  productOpen
  constructor() { }

  ngOnInit(): void {
  }

  toggleButton(type){
      if(type === 'about'){
        this.aboutOpen = !this.aboutOpen;
        this.productOpen = false;
      }else{
        this.productOpen = !this.productOpen;
        this.aboutOpen = false;
      }
  }

}
