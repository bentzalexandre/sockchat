import { Camera, CameraOptions } from '@ionic-native/camera';import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  mail: string = "";
  pseudo: string = "";
  mdp: string = "";
  validator: FormGroup;
  avatar: string = "../../assets/avatar/Avatar.jpg";

  constructor(public camera: Camera, public navCtrl: NavController, public navParams: NavParams, public socket: Socket, public formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.validator = this.formBuilder.group({
      pseudo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z]*')
      ])],
      mail: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      mdp: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
     ])]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  inscription() {
    if (this.validator.valid) { // Inscription possible suelement si le formulaire est valide
      this.socket.connect();
      this.socket.emit('inscription', { mail: this.mail, pseudo: this.pseudo, mdp: this.mdp });
      this.socket.once('status-inscription', verif => {
        let affichage;
        if (verif['status'] == true) { // Si l'inscription est réussi, redirection vers la page de connexion
          console.log("Compte crée");
          affichage = {
            title: "Succès",
            message: "Création du compte réussie !",
            buttons: [{ text: 'OK', handler: () => {
              this.navCtrl.goToRoot({});
            }}]
          };
        } else { // Si l'inscription n'a pas pu être effectuée, affichage de l'erreur
          affichage = {
            title: "Echec",
            subTitle: "Le compte n'a pu être crée, l'adresse mail est déja utilisée",
            buttons: ['OK']
          };
        }
        this.alertCtrl.create(affichage).present();
      });
    } else {
      this.socket.disconnect();
      this.alertCtrl.create({
        title: "Echec",
        subTitle: "Inscription impossible, champs non valides",
        buttons: ["OK"]
      }).present();
    }
  }

  openGallery(): void {

    console.log("Hello");
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.avatar = imageData.DATA_URL;
     }, (err) => {
      // Handle error
     });
  }

}

