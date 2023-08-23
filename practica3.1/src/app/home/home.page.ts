import { Component, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController, AnimationController, GestureController, IonCard } from '@ionic/angular';
import type { Animation, Gesture, GestureDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  private animation!: Animation;
  private gesture!: Gesture;
  private started = false;
  private initialStep = 0;

  /**
   * The track is 344px wide.
   * The card is 100px wide.
   * We want 16px of margin on each end of the track.
   */
  private readonly MAX_TRANSLATE = 344 - 100 - 32;

  msj: string = "Si ves esto, la alerta no cambio"
  nombreUsuario: string = "";
  edad: number = 25;
  user1: string = "";
  contrasena: string = "";
  apellido = "";
  personas: any = [
    {
      nombre: "Kasandra",
      edad: 19,
      fecha: "12/30/2003"
    }
  ] 

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController, private animationCtrl: AnimationController, private gestureCtrl: GestureController) {}


  private onMove(ev: GestureDetail) {
    if (!this.started) {
      this.animation.progressStart();
      this.started = true;
    }

    this.animation.progressStep(this.getStep(ev));
  }

  private onEnd(ev: GestureDetail) {
    if (!this.started) {
      return;
    }

    this.gesture.enable(false);

    const step = this.getStep(ev);
    const shouldComplete = step > 0.5;

    this.animation.progressEnd(shouldComplete ? 1 : 0, step).onFinish(() => {
      this.gesture.enable(true);
    });

    this.initialStep = shouldComplete ? this.MAX_TRANSLATE : 0;
    this.started = false;
  }

  private clamp(min: number, n: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  private getStep(ev: GestureDetail) {
    const delta = this.initialStep + ev.deltaX;
    return this.clamp(0, delta / this.MAX_TRANSLATE, 1);
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(0)', `translateX(${this.MAX_TRANSLATE}px)`);

    const gesture = (this.gesture = this.gestureCtrl.create({
      el: this.card.nativeElement,
      threshold: 0,
      gestureName: 'card-drag',
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => this.onEnd(ev),
    }));

    gesture.enable(true);
  }


  validatePasswordInput(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: mensaje,
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
    if(this.user1.trim() === '' || this.contrasena.trim() === '' ){
      this.presentAlert('Complete los campos');
    } else if (this.user1.trim().length < 3  || this.contrasena.length < 4 ) {
      this.presentAlert('Usuario o contraseña no validos!');
    } else {
      let navigationsExtras: NavigationExtras = {
        state: {
          nombreEnviado: this.user1
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
