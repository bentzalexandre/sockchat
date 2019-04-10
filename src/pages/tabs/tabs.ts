import { ContactPage } from './../contact/contact';
import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;

  donnees = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    // Initialisation des données pour tous les onglets / pages
    this.donnees = this.navParams.data;
    // console.log(this.pseudo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Bonjour ' + this.navParams.get('pseudo'),
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

}
