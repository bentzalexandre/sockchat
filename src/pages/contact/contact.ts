import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

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
  contacts:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public socket: Socket) {
    this.pseudo = this.navParams.get('pseudo');
    console.log(this.contacts);
    this.followContacts().subscribe(() => {
      this.socket.emit("get-contacts", { pseudo: this.pseudo });
      this.getContacts().subscribe(contacts => {
        this.contacts = [];
        this.contacts = contacts;
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  ionViewWillEnter(){
    this.socket.emit("get-contacts", { pseudo: this.pseudo });
    this.getContacts().subscribe(contacts => {
      this.contacts = [];
      this.contacts = contacts;
    });
  }

  getContacts() {
    let observable = new Observable(observer => {
      this.socket.on('return-contacts', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  followContacts() {
    let observable = new Observable(observer => {
      this.socket.on('log', (data) => {
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
          name: 'Adresse mail',
          type: 'text',
          placeholder: "Entrer l'adresse mail du contact"
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
            text: 'Envoyer',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
    }).present();
  }

}
