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
  	const url = 'https://axelrace.pythonanywhere.com/registro';
  	const headers = {'Content-type': 'application/json'};
  	const json = JSON.stringify(registro);
  	return this.http.post(url, json, {'headers': headers});
  }

  sesion(sesion: Sesion): Observable<any>{
  	const url = 'https://axelrace.pythonanywhere.com/sesion';
  	const headers = {'Content-type': 'application/json'};
  	const json = JSON.stringify(sesion);
  	return this.http.post(url, json, {'headers': headers});
  }

  number(numeros: Numeros): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/numeros';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(numeros);
    return this.http.post(url, json, {'headers': headers});
  }

  cierre(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/cerrar';
    return this.http.get(url);
  }
  
  tabla3(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/scrapper3';
    return this.http.get(url);
  }

  recuperar(mail: string) {
    const url = 'https://axelrace.pythonanywhere.com/recuperar';
    const headers = {'Content-type': 'application/json'};
    const json = {"correo": mail}
    const correo = JSON.stringify(json);
    return this.http.post(url, correo, {'headers': headers});
  }

  cambiar(datos: any) {
    const url = 'https://axelrace.pythonanywhere.com/cambio';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(datos);
    return this.http.post(url, json, {'headers': headers});
  }
  
}