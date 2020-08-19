import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Registro } from './registro';
import { Sesion } from './sesion';
import { Numeros } from './numeros';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  constructor(private http: HttpClient) { }

  private hora = new BehaviorSubject<any[]>([]);
  hora$ = this.hora.asObservable();

  reloj(horas: any){
    this.hora.next(horas);
  }

  private data = new BehaviorSubject('Usuario fuera de sesión');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data);
  }

  registros(registro: Registro): Observable<any>{
  	const url = 'https://reinaldobranchi.pythonanywhere.com/registro';
  	const headers = {'Content-type': 'application/json'};
  	const json = JSON.stringify(registro);
  	return this.http.post(url, json, {'headers': headers});
  }

  sesion(sesion: Sesion): Observable<any>{
  	const url = 'https://reinaldobranchi.pythonanywhere.com/sesion';
  	const headers = {'Content-type': 'application/json'};
  	const json = JSON.stringify(sesion);
  	return this.http.post(url, json, {'headers': headers});
  }

  number(numeros: Numeros): Observable<any>{
    const url = 'https://reinaldobranchi.pythonanywhere.com/numeros';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(numeros);
    return this.http.post(url, json, {'headers': headers});
  }

  cierre(): Observable<any>{
    const url = 'https://reinaldobranchi.pythonanywhere.com/cerrar';
    return this.http.get(url);
  }

  tabla(): Observable<any>{
    const url = 'https://reinaldobranchi.pythonanywhere.com/scrapper';
    return this.http.get(url);
  }

  tabla2(): Observable<any>{
    const url = 'https://reinaldobranchi.pythonanywhere.com/scrapper2';
    return this.http.get(url);
  }

  tabla3(): Observable<any>{
    const url = 'http://localhost:5000/scrapper3';
    return this.http.get(url);
  }
  validar(combinacion: any){

    console.log(combinacion);
    const combinazione = combinacion.sort((a, b) => a - b);
    const semaforo = document.getElementById("rvalidacion");
    const colores = ['green', 'yellow', 'red'];
    const primos = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
    let nprimos = 0;

    for (let i = 0; i <= combinazione.length; i++) {

      let numero = combinazione[i];

      for (let x = 0; x < primos.length; x++) {

        let primo = primos[x];

        if (numero == primo) {
          nprimos++;
        }
      }
    }

    console.log(nprimos);

    if (nprimos >= 4) {
      return colores[2];
    }

    // regla 1
    let a = 0;
    
    for (let i = 0; i < combinazione.length; i++) {
      if (combinazione[i+1] !== undefined) {
        if (combinazione[i]+1 == combinazione[i+1]) {
          a++;
        }
      }
    }
    
    if (a >= 2) {
      return colores[2];
    }
    // regla 2
    
    for (let h = 2; h <= 13; h++) {
      //
      a = 0;
      //
      for (let i = 0; i < combinazione.length; i++) {
        if (combinazione[i+1] !== undefined) {
          if (combinazione[i]+h == combinazione[i+1]) {
            a++;
          }
        }
      }
      
      if (a >= 2) {
        return colores[2];
      }
     
    }

  }
  
}
