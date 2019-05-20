import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { ProfilPage } from '../profil/profil';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  pseudo: any = "";
  users: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public socket: Socket) {
    this.pseudo = this.navParams.get('pseudo');
    this.socket.emit("get-users", {});
    this.getContacts().subscribe((data) => {
        this.users = data;
    })
  }

  ionViewWillEnter() {
    this.socket.emit("get-users", {});
    this.getContacts().subscribe(data => {
      this.users = data;
    });
  }

  ionViewWillLeave() {
    this.socket.emit("get-users", {});
  }

  getContacts() {
    let observable = new Observable(observer => {
      this.socket.on('users', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  popThis() {
    this.navCtrl.pop();
  }

  goToProfile(id: any, pseudo: any, image: any) {
    if (this.pseudo !== pseudo) {
      this.navCtrl.push(ProfilPage, { pseudo: this.pseudo, otherId: id, otherPseudo: pseudo, avatar: image });
    } else {
      this.navCtrl.parent.select(2);
    }
  }

}
