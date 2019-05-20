import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  mail: string = "";
  avatar: any;
  pseudo: string = "";
  mdp: string = "";
  validator: FormGroup;
  imagePreview: string = "../../assets/avatar/Avatar.jpg";
  imageEncoded: string;

  constructor(
    public camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public socket: Socket,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private base64: Base64
    ) {

      this.base64.encodeFile(this.imagePreview).then((base64File: string) => {
        this.imageEncoded = base64File;
      }, (err) => {
        console.log(err);
      });

    this.validator = this.formBuilder.group({
      pseudo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z]*')
      ])],
      mail: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      mdp: ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
     ])]
    });
  }

  inscription() {
    if (this.validator.valid) { // Inscription possible suelement si le formulaire est valide

      this.socket.connect();
      this.socket.emit('inscription', { mail: this.mail, image: this.avatar, pseudo: this.pseudo, mdp: this.mdp });

      this.socket.once('status-inscription', (verif) => {
        let affichage;
        if (verif['status'] == true) { // Si l'inscription est réussi, redirection vers la page de connexion

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
      this.avatar = imageData;
      this.imagePreview = "data:image/jpeg;base64," + this.avatar;
      ;
     }, (err) => {
     });
  }

}

