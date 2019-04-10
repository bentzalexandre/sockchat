import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content; // Gestion des composants de la vue

  nickname: any; // Pseudo utilisateur
  messages = []; // Tableau des messages
  message = ''; // Message en cours de saisie par l'utilisateur
  typing = false;
  typingusername: any;
  timer;


  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.nickname = this.navParams.get('pseudo');
    this.getMessages().subscribe(message => { // Surveillance des changements
      // Ajout des nouveaux messages dans le tableau messages
      this.messages.push(message);
    });
    this.getTyping().subscribe(data => {
      if (data != this.nickname) {
        if (!this.typing) {this.typing = true;}
        this.typingusername = data;
      }
    });
    this.getStopTyping().subscribe(() => {
      this.typing = false;
    });
  }

  sendMessage() {
    this.socket.emit('stop-typing');
    this.socket.emit('add-message', this.message);
    this.message = '';
  }

  getMessages() { // Reception des messages
    // Création de l'observateur du serveur
    let observable = new Observable(observer => {
      // Observation du serveur : réception des messages du socket
      this.socket.on('message', (data) => {
        // On place dans l'objet observer l'objet message retourné par notre serveur Socket
        observer.next(data);
      });
    });
    return observable; // Retour de l'observateur
  }

  getTyping() {
    let observable = new Observable(observer => {
      this.socket.on('istyping', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getStopTyping() {
    let observable = new Observable(observer => {
      this.socket.on('stoptyping', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  fin() {
    this.content.scrollToBottom(0);
  }

  IsTyping() {
    this.socket.emit('typing');
  }

  noActivity() {
    this.timer = setTimeout(() => {
      this.socket.emit('stop-typing');
    }, 10000);
  }

}
