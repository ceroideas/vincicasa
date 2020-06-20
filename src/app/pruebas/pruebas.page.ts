import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {

  n1: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;

  constructor() { }

  ngOnInit() {
  }

  validar(f: NgForm){
  	let combinacion = [this.n1, this. n2, this.n3, this.n4, this.n5];
  	return alert(combinacion);
  }

}
