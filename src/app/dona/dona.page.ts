import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.page.html',
  styleUrls: ['./dona.page.scss'],
})
export class DonaPage implements OnInit {

  constructor() { }

  type = "text";
  donation = "20€";

  ngOnInit() {
  }

  changeType(type)
  {
  	console.log(type);
  	if (type == 'number') {
  		this.donation = this.donation.replace(/€/g, '');
  	}else{
  		this.donation = this.donation+'€';
  	}
  	this.type = type;
  }

}
