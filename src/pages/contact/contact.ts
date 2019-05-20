import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ProfilPage } from '../profil/profil';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  pseudo: any = "";
  contacts: any;
  demandes: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public socket: Socket) {
    this.pseudo = this.navParams.get('pseudo');
    this.getContacts().subscribe(data => {
        this.contacts = data;
        console.log(this.contacts);
    });
  }

  ionViewWillEnter() {
    this.socket.emit("get-contacts", {});
    this.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  ionViewWillLeave() {
    this.socket.emit("get-contacts", {});
  }

  goToProfile(id: any, pseudo: any, image: any) {
    this.navCtrl.push(ProfilPage, { pseudo: this.pseudo, otherId: id, otherPseudo: pseudo, avatar: image });
  }


  getContacts() {
    let observable = new Observable(observer => {
      this.socket.on('contacts', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  showAddContact() {
    this.alertCtrl.create({
      title: 'Nouveau Contact',
      inputs: [
        {
          name: 'Pseudo...',
          type: 'text',
          placeholder: "Entrer le pseudo du nouveau contact :"
        }],
        buttons: [
          {
            text: 'Retour',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ajouter',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
    }).present();
  }

}
