import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { RoomPage } from '../room/room';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  pseudo: any;
  otherPseudo: any;
  otherId: any;
  avatar: any;
  resume: any;
  dateInscr: any;
  status: any;
  iconClass: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.pseudo = this.navParams.get('pseudo');
    this.otherPseudo = this.navParams.get('otherPseudo');
    this.otherId = this.navParams.get('otherId');
    this.avatar = this.navParams.get('avatar');
    this.getInfosContact();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  getInfosContact() {
    this.socket.emit('get-infos-contact', { pseudo: this.otherPseudo });
    this.socket.once('infos-contact', data => {
      console.log(data.resume);
      this.resume = data.resume;
      this.dateInscr = data.dateInscr;
      if (data.status == "online") {
        this.status = "Connecté";
        this.iconClass = "square-online";
      } else if (data.status == "busy") {
        this.status = "Occuppé";
        this.iconClass = "square-busy";
      } else {
        this.status = "Déconnecté";
        this.iconClass = "square-offline";
      }
    });
  }

  goToPrivateRoom() {
    this.navCtrl.push(RoomPage, { pseudo: this.pseudo, destId: this.otherId, destPseudo: this.otherPseudo});
  }

}
