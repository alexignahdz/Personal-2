import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = "Victor";
  edad: number = 25;
  user1: string = "";
  //apellido = "Ortega";
  personas: any = [
    {
      nombre: "Kasandra",
      edad: 19,
      fecha: "30/12/2003"
    }
  ] 

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) {}

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
    let navigationsExtras: NavigationExtras = {
      state: {
        nombreEnviado: this.user1,
        edadEnviada: this.edad
      }
    }
    this.presentToast('top');
    this.router.navigate(['/pagina1'], navigationsExtras);
  }

  sumar(){
    console.log("Hola Papus");
    this.nombreUsuario;
  
  }

}
