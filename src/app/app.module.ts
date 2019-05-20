import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { TabsPage } from './../pages/tabs/tabs';
import { ConnexionPage } from './../pages/connexion/connexion';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Base64 } from "@ionic-native/base64";
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { InscriptionPage } from '../pages/inscription/inscription';
import { RoomPage } from '../pages/room/room';
import { UsersPage } from '../pages/users/users';
import { ProfilPage } from '../pages/profil/profil';
import { DefaultImageProvider } from '../providers/default-image/default-image';

const config: SocketIoConfig = { url: 'http://172.20.10.3:3001', options: {}};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    InscriptionPage,
    ConnexionPage,
    RoomPage,
    UsersPage,
    ProfilPage
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
    InscriptionPage,
    RoomPage,
    UsersPage,
    ProfilPage
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
