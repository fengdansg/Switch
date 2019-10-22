import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabPage} from "../tab-page/tab-page";
import {LoginPage} from "../login-page/login-page";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  login(): void {
    this.getProfile();

  }
  getProfile(): void {
    //this.menu.enable(true);

    this.navCtrl.setRoot(TabPage);

  }

  openLogin(){
    this.navCtrl.push(LoginPage);

  }

}
