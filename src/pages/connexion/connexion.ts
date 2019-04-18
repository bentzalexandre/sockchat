import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { InscriptionPage } from '../inscription/inscription';

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  mail: any = "";
  password: any = "";
  showPass = false;
  passType = 'password';
  iconName = "eye-off";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private socket: Socket, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  connexion() {
    this.socket.connect();
    this.socket.emit('connexion', { mail: this.mail, password: this.password });
    this.socket.once('status-connexion', verif => {
      if (verif.status == true) {
        this.socket.connect();
        this.navCtrl.push(TabsPage, { pseudo: verif.pseudo });
      } else {
        this.alertCtrl.create({
          title: "Echec",
          subTitle: verif.error,
          buttons: ['OK']
        }).present();
      }
    });
  }

  inscription() {
    this.navCtrl.push(InscriptionPage);
  }

  showPassword() {
    this.showPass = !this.showPass;
      if(this.showPass){
        this.passType = 'text';
        this.iconName = "eye";
      } else {
        this.passType = 'password';
        this.iconName = "eye-off";
    }
  }

}
