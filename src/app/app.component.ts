import { Socket } from 'ng-socket-io';
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';
import { ConnexionPage } from '../pages/connexion/connexion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage:any = ConnexionPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public socket: Socket) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  deconnexion() {
    this.socket.disconnect();
    this.nav.setRoot(ConnexionPage);
  }

  ionViewWillLeave(){
   this.socket.disconnect();
  }
}

