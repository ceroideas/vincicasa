import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController } from '@ionic/angular';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
/*import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';*/
//import { File } from '@ionic-native/file';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

	datos: any;
	funcion: string = 'UTENTI';

  constructor(private comunicacion: ComunicacionService, public nav: NavController, public alertController: AlertController, public loading: LoadingController /*, private transfer: FileTransfer*/) { }

  /*fileTransfer: FileTransferObject = this.transfer.create();*/

  ngOnInit() {

  	this.activador(this.funcion);

  }

  activador(nombres){

  	if (nombres === 'UTENTI') {

      this.funcion = nombres;

      let name = [], 
        correos = [], 
        fechas = [], 
        sexos = [];

      this.comunicacion.usuarios().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].nombre;

          name.push(dato.toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].correo;

          correos.push(dato.toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].fechan;

          fechas.push(moment(dato).format('YYYY-MM-DD').toString());
    
        }

        for (let i = 0; i < data.usuarios.length; i++) {

          dato = json.usuarios[i].sexo;

          sexos.push(dato.toString());
    
        }

      }, Error => {

        this.activador(nombres);
        console.log(Error);

      });

      //console.log(correos, fechas, name, sexos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        nombres: name, 
        sexos: sexos
      };

      //console.log(this.datos);

  	}else if (nombres === 'DONATORI') {

      this.funcion = nombres;

      let usuarios = [], 
        correos = [], 
        fechas = [], 
        montos = [];

      this.comunicacion.donadores().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].usuario;

          usuarios.push(dato.toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].correo;

          correos.push(dato.toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].fecha;

          fechas.push(moment(dato).format('YYYY-MM-DD').toString());
    
        }

        for (let i = 0; i < data.donadores.length; i++) {

          dato = json.donadores[i].monto;

          montos.push(dato.toString());
    
        }

      }, Error => {

        this.activador(nombres);
        console.log(Error);

      });

      console.log(correos, fechas, usuarios, montos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        usuarios: usuarios, 
        montos: montos
      };

      console.log(this.datos);

  	}else{

      this.funcion = 'VINCITORI';

      let numeros = [], 
        correos = [], 
        fechas = [], 
        aciertos = [];

      this.comunicacion.ganadores().subscribe((data: any) => {

        let dato;
        let json = data;

        for (let i = 0; i < data.ganadores.length; i++) {

          dato = json.ganadores[i];

          if (json.ganadores[i].aciertos >= 0) {

            numeros.push(dato.numero.toString()); 
            correos.push(dato.usuario.toString());
            fechas.push(moment(dato.fjugada).format('YYYY-MM-DD').toString());
            aciertos.push(dato.aciertos.toString());

          }
    
        }

        // for (let i = 0; i < data.ganadores.length; i++) {

        //   dato = json.ganadores[i];

        //   if (json.ganadores[i].aciertos >= 0) {


        //   }
    
        // }

        // for (let i = 0; i < data.ganadores.length; i++) {

        //   dato = json.ganadores[i];

        //   if (json.ganadores[i].aciertos >= 0) {


        //   }
    
        // }

        // for (let i = 0; i < data.ganadores.length; i++) {

        //   dato = json.ganadores[i];

        //   if (json.ganadores[i].aciertos >= 0) {


        //   }
    
        // }

      }, Error => {

        this.activador(nombres);
        console.log(Error);

      });

      //console.log(correos, fechas, numeros, aciertos);

      this.datos = { 
        correos: correos, 
        fechas: fechas, 
        numeros: numeros, 
        aciertos: aciertos
      };

      //console.log(this.datos);

  	}

  }

  /*excel() {

    const url = 'https://axelrace.pythonanywhere.com/excel';
    this.fileTransfer.download(url, 'files' + 'datos.xlsx').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });

  }*/

  excel(){

    this.loading.create().then(l=>{
      l.present();

      this.comunicacion.excel().subscribe((data: any) => {

        l.dismiss();

        console.log('Envío exitoso');

        this.alertController.create({message:"Excel inviato per posta!"}).then(a=>a.present());
        
      }, Error => {

        l.dismiss();

        console.log(Error);

        return this.excel();

      });
    })
  }

  salir(){

  	localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('excluidos');
    localStorage.removeItem('incluidos');
    this.nav.navigateRoot('home');

  }

}
