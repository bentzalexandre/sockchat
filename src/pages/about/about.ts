import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  pseudo: any;
  mail: any;
  status: any;
  dateInscription: any;
  resume: any;
  image: any;
  iconClass: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.pseudo = this.navParams.get('pseudo');
  }

  ionViewWillEnter() {
    this.socket.emit("get-profile");
    this.socket.once("profile", (data) => {
      this.image = data.image;
      this.mail = data.mail;
      if (data.status == "online") {
        this.status = "Connecté";
      } else if (data.status == "busy") {
        this.status = "Occuppé";
      } else {
        this.status = "Déconnecté";
      }
      this.resume = data.resume;
      this.dateInscription = data.dateInscr;
    });
  }

}
