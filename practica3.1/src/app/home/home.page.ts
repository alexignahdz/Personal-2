import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = "";
  edad: number = 0;
  user1: string = "";
  contrasena: string = "";
  //apellido = "Ortega";
  personas: any = [
    {
      nombre: "Kasandra",
      edad: 19,
      fecha: "30/12/2003"
    }
  ] 

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) {}

  validatePasswordInput(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: '¡Esto es una alerta PAPU!',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Benvenutti!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  irPag1(){
    if(this.user1.trim() || this.contrasena.trim() ){
      this.presentAlert('Complete los campos');
    } else if (this.user1.trim().length < 3  || this.contrasena.length < 4 ) {
      this.presentAlert('Usuario o contraseña no validos!');
    } else {
      let navigationsExtras: NavigationExtras = {
        state: {
          nombreEnviado: this.user1,
          edadEnviada: this.edad
        }
      }
      this.presentToast('top');
      this.router.navigate(['/pagina1'], navigationsExtras);
    }
  }

  sumar(){
    console.log("Hola Papus");
    this.nombreUsuario;
  
  }



}
