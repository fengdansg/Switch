import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {TabPage} from "../tab-page/tab-page";
import {SignupPage} from "../signup-page/signup-page";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.enable(false);
  }

  login(): void {
    this.getProfile();

  }
  getProfile(): void {
    this.menu.enable(true);

    this.navCtrl.setRoot(TabPage);

  }
  openSignup(){
    this.navCtrl.push(SignupPage);
  }

}
