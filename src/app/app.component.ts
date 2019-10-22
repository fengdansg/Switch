import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login-page/login-page";
import {TabPage} from "../pages/tab-page/tab-page";
import {SettingPage} from "../pages/setting-page/setting-page"
import {PaymentPage} from "../pages/payment-page/payment-page";
import {BillPage} from "../pages/bill-page/bill-page";
import {ProfilePage} from "../pages/profile-page/profile-page";
import {TipsPage} from "../pages/tips-page/tips-page";
import {FAQPage} from "../pages/faq-page/faq-page";
import {NotificationPage} from "../pages/notification-page/notification-page";
import {Data} from "../providers/data";
import {SmartAudioProvider} from "../providers/smart-audio/smart-audio";
import {ContactPage} from "../pages/contact/contact";
import {LocalNotifications} from "@ionic-native/local-notifications";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  homePage: any =TabPage;
  settingPage:any=SettingPage;
  paymentPage:any=PaymentPage;
  billPage:any=BillPage;
  profilePage:any=ProfilePage;
  tipsPage:any = TipsPage;
  faqPage:any = FAQPage;
  contactPage:any=ContactPage;
  notificationPage:any = NotificationPage;
  numNotices:any;

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController,public dataService:Data,public events: Events,smartAudio:SmartAudioProvider,private localnotifications:LocalNotifications) {


    platform.ready().then((readySource) => {

      this.localnotifications.on('click',(notification,state)=>{
       // let json = JSON.parse(notification.data);
        dataService.setshowMailID(notification.id);
        this.nav.push(this.notificationPage);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      smartAudio.preload('tabSwitch', 'assets/audio/clickSound.wav');


      events.subscribe('numNotices:changed',(numNotices)=>{
        this.numNotices = numNotices;
        console.log('app.component.ts events:'+this.numNotices);
      });

      this.numNotices=this.dataService.getNumNotices();

    });






  }
  updateToast(numNotices){
    this.numNotices=numNotices;
  }

  openPage(page): void{
    this.menu.close();
    this.nav.setRoot(page);

  }
  ionViewDidLoad(){
    this.numNotices=this.dataService.getNumNotices();
    console.log('ionViewDidLoad number of notices: '+this.numNotices);
  }

  viewPage(page):void{
    this.menu.close();
    this.nav.push(page);
  }

  logout(): void{
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);

  }


}

