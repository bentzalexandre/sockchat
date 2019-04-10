import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { TabsPage } from './../pages/tabs/tabs';
import { ConnexionPage } from './../pages/connexion/connexion';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Base64 } from "@ionic-native/base64";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { InscriptionPage } from '../pages/inscription/inscription';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {}};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    InscriptionPage,
    ConnexionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config) // Import du module SocketIO
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnexionPage,
    TabsPage,
    AboutPage,
    ContactPage,
    InscriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Base64,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
