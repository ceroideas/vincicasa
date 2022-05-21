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

  hSorteo = "20:00";

  reloj(horas: any){
    this.hora.next(horas);
  }

  private data = new BehaviorSubject('Usuario fuera de sesión');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(JSON.parse(data));
  }

  registros(registro: Registro): Observable<any>{
  	// const url = 'http://localhost:8000/api/registro';
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/registro';
  	const headers = {'Content-type': 'application/json'};
  	//const json = JSON.stringify(registro);
  	return this.http.post(url, registro, {'headers': headers});
  }

  sesion(sesion: Sesion): Observable<any>{
  	const url = 'https://axelrace.pythonanywhere.com/vincicasa/sesion';
  	const headers = {'Content-type': 'application/json'};
  	return this.http.post(url, sesion, {'headers': headers});
  }

  horaconexion(datos: any): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/horasesion';
    const headers = {'Content-type': 'application/json'};
    return this.http.post(url, JSON.stringify(datos), {'headers': headers});
  }

  actualizar_combinaciones(datos: any): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/actualizar';
    const headers = {'Content-type': 'application/json'};
    
    return this.http.post(url, JSON.stringify(datos), {'headers': headers});
  }

  number(numeros: Numeros): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/numeros';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(numeros);
    console.log(json, numeros);
    return this.http.post(url, json, {'headers': headers});
  }

  cierre(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/cerrar';
    return this.http.get(url);
  }
  
  tabla3(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/scrapper3';
    return this.http.get(url);
  }

  recuperar(mail: string, codigo: string) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/recuperar';
    const headers = {'Content-type': 'application/json'};
    const json = {"correo": mail, "codigo": codigo}
    const correo = JSON.stringify(json);
    return this.http.post(url, correo, {'headers': headers});
  }

  cambiar(datos: any) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/cambio';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(datos);
    return this.http.post(url, json, {'headers': headers});
  }

  ganador(numeros: Numeros) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/ganador';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(numeros);
    return this.http.post(url, json, {'headers': headers});
  }

  usuarios(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/usuarios';
    return this.http.get(url);
  }

  ganadores(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/winners';
    return this.http.get(url);
  }
  
  pago(datos: any) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/pago';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(datos);
    return this.http.post(url, json, {'headers': headers});
  }

  saveOneSignalId(datos: any) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/saveOneSignalId';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(datos);
    return this.http.post(url, json, {'headers': headers});
  }

  donadores(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/pago';
    return this.http.get(url);
  }

  excel(): Observable<any>{
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/excel';
    return this.http.get(url);
  }

  notificaciones_push(datos: any) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/datas';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify(datos);
    return this.http.post(url, json, {'headers': headers});
  }

  disableAcc(correo) {
    const url = 'https://axelrace.pythonanywhere.com/vincicasa/disableAcc';
    const headers = {'Content-type': 'application/json'};
    const json = JSON.stringify({correo:correo});
    console.log(json)
    return this.http.post(url, json, {'headers': headers});
  }

}