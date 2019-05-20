import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  @ViewChild(Content) content: Content; // Gestion des composants de la vue

  pseudo: any; // Pseudo utilisateur
  idDest: any;
  pseudoDest: any;
  messages = []; // Tableau des messages
  message = ''; // Message en cours de saisie par l'utilisateur
  typing = false;
  typingusername: any;
  timer;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socket: Socket,
    private camera: Camera
  ) {
    this.pseudo = this.navParams.get('pseudo');
    this.idDest = this.navParams.get('destId');
    this.pseudoDest = this.navParams.get('destPseudo')

    this.getMessages().subscribe( message => { // Surveillance des changements
      this.messages.push(message);
    });

    this.getTyping().subscribe( pseudo => {
      if (pseudo != this.pseudo) {
        if (!this.typing) {this.typing = true;}
        this.typingusername = pseudo;
      }
    });

    this.getStopTyping().subscribe(() => {
      this.typing = false;
    });
  }

  sendMessage() {
    this.socket.emit('stop-typing');
    this.socket.emit('private-message', { id: this.idDest, text: this.message });
    this.message = '';
  }

  getMessages() { // Reception des messages
    // Création de l'observateur du serveur
    let observable = new Observable(observer => {
      // Observation du serveur : réception des messages du socket
      this.socket.on('p-message', (data) => {
        // On place dans l'objet observer l'objet message retourné par notre serveur Socket
        observer.next(data);
      });
    });
    return observable; // Retour de l'observateur
  }

  getTyping() {
    let observable = new Observable(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getStopTyping() {
    let observable = new Observable(observer => {
      this.socket.on('s-typing', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  fin() {
    this.content.scrollToBottom(0);
  }

  IsTyping() {
    this.socket.emit('start-typing');
  }

  noActivity() {
    this.timer = setTimeout(() => {
      this.socket.emit('stop-typing');
    }, 10000);
  }

  openGallery(): void {

    let cameraOptions: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 250,
      targetHeight: 250,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.socket.emit("add-pimage", imageData );
     }, (err) => {
     });
  }

}
